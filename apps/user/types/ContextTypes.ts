export type ChatContextType = {
  showEmojibox: boolean;
  toggleShowEmojibox: () => void;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
};

export type ModalContextType = {
  isOpen: boolean;
  feedId: string;
  open: (feedId: string) => void;
  close: () => void;
  ModalType: 'image' | 'video' | null;
  setModalType: React.Dispatch<React.SetStateAction<'image' | 'video' | null>>;
};
