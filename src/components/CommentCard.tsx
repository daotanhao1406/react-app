import { MessageSquare, CheckCircle2, History, Quote } from "lucide-react";

interface CommentsCardProps {
  solveInfoMessage: string;
  theBestHistoryMessage: string;
}

export const CommentsCard = ({
  solveInfoMessage,
  theBestHistoryMessage,
}: CommentsCardProps) => {
  return (
    <div className="bento-item border border-border/50 hover-lift animate-slide-up stagger-5 col-span-full lg:col-span-2">
      <div className="flex items-center gap-2 mb-4">
        <div className="icon-box">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-display font-semibold text-foreground">
          Bình luận & Ghi chú
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Solve Info */}
        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-success/5 to-success/10 border border-success/20 overflow-hidden">
          <div className="absolute top-3 right-3 opacity-10">
            <Quote className="w-12 h-12 text-success" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <p className="text-sm font-medium text-success">Thông tin xử lý</p>
          </div>
          <p className="text-foreground leading-relaxed relative z-10">
            {solveInfoMessage}
          </p>
        </div>

        {/* Best History */}
        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 overflow-hidden">
          <div className="absolute top-3 right-3 opacity-10">
            <Quote className="w-12 h-12 text-primary" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <History className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium text-primary">Ý kiến nổi bật</p>
          </div>
          <p className="text-foreground leading-relaxed relative z-10">
            {theBestHistoryMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
