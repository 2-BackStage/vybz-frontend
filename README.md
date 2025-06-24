# Vybz Frontend - Turborepo Monorepo

Vybz는 버스킹 플랫폼의 프론트엔드 모노레포입니다. Turborepo를 사용하여 관리되며, Next.js 기반의 3개 애플리케이션으로 구성되어 있습니다.

## 🏗️ 프로젝트 구조

### Apps
- **User App** (포트 3000): 일반 사용자용 애플리케이션
- **Busker App** (포트 3001): 버스커용 애플리케이션  
- **Admin App** (포트 3002): 관리자용 애플리케이션

### Packages
- **@repo/ui**: 공통 UI 컴포넌트
- **@repo/eslint-config**: ESLint 설정
- **@repo/tailwind-config**: Tailwind CSS 설정
- **@repo/typescript-config**: TypeScript 설정

## 🚀 CI/CD 파이프라인

### 워크플로우 구성

1. **CI Pipeline** (`.github/workflows/ci.yml`)
   - 코드 품질 검사 (lint, type-check, format)
   - 빌드 테스트
   - 보안 스캔 (Trivy)

2. **Staging Deployment** (`.github/workflows/cd-staging.yml`)
   - `dev` 브랜치 푸시 시 자동 배포
   - Vercel을 통한 스테이징 환경 배포

3. **Production Deployment** (`.github/workflows/cd-production.yml`)
   - `main` 브랜치 푸시 시 자동 배포
   - 수동 배포 옵션 제공
   - 스모크 테스트 포함

4. **EC2 Deployment** (`.github/workflows/cd-ec2.yml`)
   - EC2에 Docker 컨테이너로 배포
   - Docker Hub를 통한 이미지 관리
   - 변경된 앱만 선택적 배포

5. **Performance Monitoring** (`.github/workflows/performance.yml`)
   - Lighthouse 성능 테스트
   - 번들 분석
   - PR 코멘트 자동 생성

6. **Dependency Updates** (`.github/workflows/dependency-update.yml`)
   - 주간 자동 의존성 업데이트
   - 업데이트 시 자동 PR 생성

7. **Rollback** (`.github/workflows/rollback.yml`)
   - 수동 롤백 기능
   - 특정 버전으로 복원

8. **Notifications** (`.github/workflows/notifications.yml`)
   - Slack/Discord 배포 알림
   - 실패 시 즉시 알림

### 브랜치 전략

```
main (프로덕션)
├── dev (스테이징)
├── feature/* (기능 개발)
└── hotfix/* (긴급 수정)
```

### 배포 환경

- **Staging**: `dev` 브랜치 → 자동 배포
- **Production**: `main` 브랜치 → 자동 배포 + 수동 승인

## 🛠️ 개발 환경 설정

### 필수 요구사항
- Node.js 18+
- pnpm 8.15.6+

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (모든 앱)
pnpm dev

# 특정 앱만 실행
pnpm dev --filter=user
pnpm dev --filter=busker
pnpm dev --filter=admin

# 빌드
pnpm build

# 린트 검사
pnpm lint

# 타입 체크
pnpm check-types
```

## 🔧 환경 변수 설정

각 애플리케이션은 다음 환경 변수들이 필요합니다:

```env
BASE_URL=
BASE_API_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME=
```

## 📋 GitHub Secrets 설정

CI/CD 파이프라인을 위해 다음 GitHub Secrets를 설정해야 합니다:

### Vercel 관련
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_USER_PROJECT_ID`
- `VERCEL_BUSKER_PROJECT_ID`
- `VERCEL_ADMIN_PROJECT_ID`

### Docker Hub 관련
- `DOCKER_HUB_USERNAME`: Docker Hub 사용자명
- `DOCKER_HUB_PASSWORD`: Docker Hub 액세스 토큰

### EC2 관련
- `EC2_HOST`
- `EC2_USERNAME`
- `EC2_SSH_KEY`
- `EC2_PORT` (선택사항, 기본값: 22)

### 환경별 URL
- `STAGING_BASE_URL`, `PRODUCTION_BASE_URL`
- `STAGING_API_URL`, `PRODUCTION_API_URL`
- `STAGING_NEXTAUTH_URL`, `PRODUCTION_NEXTAUTH_URL`

### AWS 관련
- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET_NAME`

### 알림 관련
- `SLACK_WEBHOOK_URL`
- `DISCORD_WEBHOOK_URL`

## 🎯 개발 가이드라인

### 커밋 메시지 규칙
```
type(scope): description

feat: 새로운 기능
fix: 버그 수정
docs: 문서 수정
refactor: 코드 리팩토링
chore: 기타 작업
design: 디자인 관련
hotfix: 긴급 수정
```

### 코드 품질
- ESLint 규칙 준수
- TypeScript 타입 체크 통과
- Prettier 포맷팅 적용
- Husky Git hooks로 자동 검사

## 📊 모니터링

- **성능**: Lighthouse CI로 자동 측정
- **번들 크기**: Bundle Analyzer로 분석
- **보안**: Trivy로 취약점 스캔
- **배포 상태**: Slack/Discord 알림

## 🔄 롤백 절차

1. GitHub Actions → Rollback Deployment 워크플로우 실행
2. 환경 선택 (staging/production)
3. 롤백할 버전(commit hash) 입력
4. 자동 롤백 실행

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. GitHub Actions 로그
2. Vercel 배포 로그
3. EC2 배포 로그
4. 환경 변수 설정
5. 의존성 버전 호환성
