import { useState } from 'react';
import { commentsData, Comment as CommentType, Reply } from '@/data/commentsData';
import { ThumbsUp, Heart, User, Send } from 'lucide-react';

const Avatar = ({ name, avatarUrl, isReply = false }: { name: string; avatarUrl?: string; isReply?: boolean }) => {
  const initial = name.charAt(0).toUpperCase();
  const sizeClass = isReply ? 'w-6 h-6' : 'w-7 h-7';
  const textClass = isReply ? 'text-[11px]' : 'text-xs';
  return (
    <div className={`${sizeClass} rounded-full bg-gray-200 overflow-hidden flex items-center justify-center font-bold text-gray-500 select-none flex-shrink-0`}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="block w-full h-full object-cover" loading="lazy" decoding="async" />
      ) : (
        <span className={textClass}>{initial}</span>
      )}
    </div>
  );
};

const ReactionBadge = ({ count }: { count: number }) => (
  <div className="flex items-center gap-1 rounded-full bg-white border border-gray-200 shadow-sm px-1 py-0.5">
    <div className="flex items-center -space-x-1">
      <span className="h-3.5 w-3.5 rounded-full bg-blue-600 flex items-center justify-center">
        <ThumbsUp size={9} className="text-white" fill="white" />
      </span>
      <span className="h-3.5 w-3.5 rounded-full bg-red-500 flex items-center justify-center">
        <Heart size={9} className="text-white" fill="white" />
      </span>
    </div>
    <span className="text-[11px] font-semibold text-gray-600 leading-none">{count}</span>
  </div>
);

const ReplyComponent = ({ reply }: { reply: Reply }) => (
  <div className="flex items-start gap-2 mt-2 ml-6 sm:ml-10">
    <Avatar name={reply.name} avatarUrl={reply.avatarUrl} isReply={true} />
    <div className="flex-1 min-w-0">
      <div
        className={`relative inline-block max-w-full bg-[#F0F2F5] rounded-2xl px-3 pt-2 ${reply.likes > 0 ? 'pb-4' : 'pb-2'}`}
      >
        <p className="font-semibold text-[12px] text-[#050505] leading-snug">{reply.name}</p>
        <p className="text-[13px] text-[#050505] leading-snug break-words">{reply.text}</p>
        {reply.likes > 0 && (
          <div className="absolute -bottom-2 right-2">
            <ReactionBadge count={reply.likes} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 text-[12px] text-[#65676B] mt-1 pl-2 sm:pl-3">
        <span className="font-normal select-none">{reply.time}</span>
        <span className="font-semibold cursor-pointer hover:underline">Curtir</span>
        <span className="font-semibold cursor-pointer hover:underline">Responder</span>
      </div>
    </div>
  </div>
);

const CommentComponent = ({ comment }: { comment: CommentType }) => (
  <div className="flex items-start gap-2">
    <Avatar name={comment.name} avatarUrl={comment.avatarUrl} />
    <div className="flex-1 min-w-0">
      <div
        className={`relative inline-block max-w-full bg-[#F0F2F5] rounded-2xl px-3 pt-2 ${comment.likes > 0 ? 'pb-4' : 'pb-2'}`}
      >
        <p className="font-semibold text-[12px] text-[#050505] leading-snug">{comment.name}</p>
        <p className="text-[13px] text-[#050505] leading-snug break-words">{comment.text}</p>
        {comment.likes > 0 && (
          <div className="absolute -bottom-2 right-2">
            <ReactionBadge count={comment.likes} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 text-[12px] text-[#65676B] mt-1 pl-3">
        <span className="font-normal select-none">{comment.time}</span>
        <span className="font-semibold cursor-pointer hover:underline">Curtir</span>
        <span className="font-semibold cursor-pointer hover:underline">Responder</span>
      </div>

      {comment.replies?.map((reply, index) => (
        <ReplyComponent key={index} reply={reply} />
      ))}
    </div>
  </div>
);

export const CommentsSection = () => {
  const [userComments, setUserComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const newCommentObject: CommentType = {
      id: Date.now(),
      name: 'Usuaria anónima',
      time: 'hace un momento',
      text: newComment,
      likes: 0,
    };

    setUserComments([newCommentObject, ...userComments]);
    setNewComment('');
  };

  return (
    <section className="w-full bg-[#F5F5F5] pt-2 pb-8 sm:pt-3 sm:pb-12 font-sans">
      <div className="max-w-lg mx-auto px-4">
        <h3 className="text-sm sm:text-base font-bold text-foreground text-center mb-3">
          lo que dicen las mujeres ya lo aplicaron
        </h3>

        <div className="space-y-3">
          {[...userComments, ...commentsData].map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200">
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center select-none flex-shrink-0">
              <User size={16} className="text-gray-600" />
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                className="w-full bg-gray-100 border border-gray-300 rounded-full px-4 py-1.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/60 transition-shadow"
              />
              <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-primary hover:bg-primary/10 transition-colors disabled:text-gray-400 disabled:hover:bg-transparent" disabled={!newComment.trim()}>
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
