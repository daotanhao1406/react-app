import { Globe, FileStack } from "lucide-react";

interface DocumentMetaCardProps {
  language: string;
  pages: number;
}

export const DocumentMetaCard = ({
  language,
  pages,
}: DocumentMetaCardProps) => {
  return (
    <div className="bento-item border border-border/50 hover-lift animate-slide-up stagger-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="icon-box">
          <FileStack className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-display font-semibold text-foreground">
          Thông tin khác
        </h3>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 p-4 rounded-xl bg-secondary/50 border border-border/50 text-center">
          <Globe className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Ngôn ngữ
          </p>
          <p className="font-semibold text-foreground">{language}</p>
        </div>

        <div className="flex-1 p-4 rounded-xl bg-secondary/50 border border-border/50 text-center">
          <FileStack className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Số trang
          </p>
          <p className="font-semibold text-foreground">{pages}</p>
        </div>
      </div>
    </div>
  );
};

// <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     <Card className="card-hover border-border/50 shadow-md overflow-hidden" data-testid="card-other-info">
//                       <CardHeader className="bg-gradient-to-r from-cyan-500/5 to-transparent border-b border-border/30">
//                         <CardTitle className="flex items-center gap-2 text-lg" style={{ fontFamily: "var(--font-display)" }}>
//                           <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
//                             <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
//                           </div>
//                           Thông tin khác
//                         </CardTitle>
//                       </CardHeader>
//                       <CardContent className="p-6">
//                         <div className="grid grid-cols-2 gap-4">
//                           <div className="text-center p-4 rounded-xl bg-secondary/50 border border-border/50">
//                             <Globe className="w-6 h-6 text-primary mx-auto mb-2" />
//                             <p className="text-xs text-muted-foreground mb-1">Ngôn ngữ</p>
//                             <p className="font-semibold text-foreground text-sm" data-testid="text-language">
//                               {mockDocument.language}
//                             </p>
//                           </div>
//                           <div className="text-center p-4 rounded-xl bg-secondary/50 border border-border/50">
//                             <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
//                             <p className="text-xs text-muted-foreground mb-1">Số trang</p>
//                             <p className="font-semibold text-foreground text-sm" data-testid="text-pages">
//                               {mockDocument.pages} trang
//                             </p>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
