# 1단계: Build Stage
FROM node:20 AS builder

WORKDIR /app

# 코드 복사
COPY . .

# user 앱용 env
RUN echo "NEXTAUTH_SECRET=dummy" > apps/user/.env \
  && echo "BASE_API_URL=https://dummy.api" >> apps/user/.env \
  && echo "NEXTAUTH_URL=http://localhost:3000" >> apps/user/.env

# busker 앱용 env
RUN echo "NEXTAUTH_SECRET=dummy" > apps/busker/.env \
  && echo "BASE_API_URL=https://dummy.api" >> apps/busker/.env \
  && echo "NEXTAUTH_URL=http://localhost:3001" >> apps/busker/.env


# corepack 기반 pnpm 활성화
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate

# 전역 turbo 설치
RUN npm install -g turbo --unsafe-perm

# 의존성 설치
RUN pnpm install

# 빌드 실행
#RUN turbo run build --filter=user --filter=busker --filter=admin
RUN turbo run build --filter=user --filter=busker --filter=admin


# 2단계: Run Stage
FROM node:20-slim AS runner

WORKDIR /app

# ps 명령어 설치
RUN apt-get update && apt-get install -y procps curl && rm -rf /var/lib/apt/lists/*

# corepack 기반 pnpm 재설정
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate

# 코드 복사
COPY --from=builder /app .

EXPOSE 3000 3001 3002

CMD ["sh", "-c", "npx concurrently --kill-others --names 'user,busker,admin' \
  'pnpm --filter=user start' \
  'pnpm --filter=busker start' \
  'pnpm --filter=admin start'"]