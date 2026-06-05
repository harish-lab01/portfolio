import React from 'react';

export default function BrowserMockup({ url, type = 'dashboard', className = '' }) {
  return (
    <div className={`relative w-full max-w-[480px] rounded-2xl bg-white border border-border-glow shadow-2xl overflow-hidden aspect-video flex flex-col ${className}`}>
      {/* Browser Bar */}
      <div className="bg-bg-ivory border-b border-border-glow/60 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 block" />
        </div>
        <div className="w-[60%] bg-white border border-border-glow rounded px-2.5 py-0.5 text-[9px] font-code text-text-muted text-center truncate select-none shadow-sm">
          https://{url}
        </div>
        <div className="w-3.5" /> {/* Spacer */}
      </div>
      
      {/* Browser Body content depending on type */}
      <div className="flex-1 bg-bg-ivory p-3.5 overflow-hidden flex flex-col gap-2 relative">
        {type === 'ecommerce' && (
          <div className="flex-1 flex flex-col gap-2 animate-[float_6s_ease-in-out_infinite]">
            <div className="h-10 w-full rounded bg-gradient-to-r from-primary-glow-from/20 to-aurora-pink/20 border border-primary-glow-from/10 flex items-center px-3 justify-between">
              <div className="w-12 h-2.5 bg-white/60 rounded" />
              <div className="w-6 h-2.5 bg-white/60 rounded" />
            </div>
            <div className="grid grid-cols-3 gap-2 flex-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded border border-border-glow bg-white p-1.5 flex flex-col justify-between">
                  <div className="w-full aspect-square rounded bg-gradient-to-tr from-[#6C63FF]/10 to-[#45E5C8]/10" />
                  <div className="w-8 h-2 bg-text-muted/15 rounded mt-1.5" />
                  <div className="w-4 h-2.5 bg-primary-glow-from/25 rounded mt-1" />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {type === 'dashboard' && (
          <div className="flex-1 grid grid-cols-4 gap-2 animate-[float_6s_ease-in-out_infinite_1s]">
            {/* Sidebar */}
            <div className="col-span-1 rounded border border-border-glow bg-white p-1.5 flex flex-col gap-1.5">
              <div className="w-full h-3.5 bg-primary-glow-from/15 rounded" />
              {[1, 2, 3].map(i => (
                <div key={i} className="w-[80%] h-2 bg-text-muted/15 rounded" />
              ))}
            </div>
            {/* Main dashboard content */}
            <div className="col-span-3 flex flex-col gap-2">
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="rounded border border-border-glow bg-white p-1.5">
                    <div className="w-6 h-1.5 bg-text-muted/20 rounded mb-1" />
                    <div className="w-8 h-3.5 bg-primary-glow-from/20 rounded" />
                  </div>
                ))}
              </div>
              <div className="flex-1 rounded border border-border-glow bg-white p-2 flex flex-col gap-1.5">
                <div className="w-16 h-2.5 bg-text-muted/30 rounded" />
                <div className="w-full h-1.5 bg-text-muted/10 rounded" />
                <div className="w-full h-1.5 bg-text-muted/10 rounded" />
                <div className="w-[60%] h-1.5 bg-text-muted/10 rounded" />
              </div>
            </div>
          </div>
        )}
        
        {type === 'safety' && (
          <div className="flex-1 flex flex-col gap-2 animate-[float_5s_ease-in-out_infinite]">
            <div className="flex items-center justify-between border-b border-border-glow/40 pb-1.5">
              <div className="w-16 h-3 bg-teal-500/20 rounded" />
              <div className="w-10 h-3.5 bg-teal-500/35 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1">
              <div className="rounded border border-border-glow bg-white p-2 flex flex-col justify-between">
                <div className="w-full h-6 rounded bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 flex items-center justify-center text-[10px]">
                  📹
                </div>
                <div className="w-12 h-2 bg-text-muted/20 rounded mt-1.5" />
                <div className="w-16 h-1 bg-text-muted/10 rounded mt-1" />
              </div>
              <div className="rounded border border-border-glow bg-white p-2 flex flex-col justify-between">
                <div className="w-full h-6 rounded bg-teal-500/10 flex items-center justify-center text-[10px]">
                  📋
                </div>
                <div className="w-12 h-2 bg-text-muted/20 rounded mt-1.5" />
                <div className="w-16 h-1 bg-text-muted/10 rounded mt-1" />
              </div>
            </div>
          </div>
        )}

        {type === 'chat' && (
          <div className="flex-1 grid grid-cols-3 gap-2 animate-[float_7s_ease-in-out_infinite]">
            {/* Conversations list */}
            <div className="col-span-1 border border-border-glow bg-white rounded p-1.5 flex flex-col gap-1.5">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-400 shrink-0" />
                  <div className="w-full h-1.5 bg-text-muted/15 rounded" />
                </div>
              ))}
            </div>
            {/* Chat Pane */}
            <div className="col-span-2 border border-border-glow bg-white rounded p-1.5 flex flex-col justify-between">
              <div className="flex flex-col gap-1">
                <div className="self-start w-16 h-3 bg-text-muted/15 rounded-full" />
                <div className="self-end w-20 h-3 bg-orange-500/25 rounded-full" />
                <div className="self-start w-12 h-3 bg-text-muted/15 rounded-full" />
              </div>
              <div className="w-full h-2.5 bg-bg-ivory border border-border-glow rounded-full mt-2" />
            </div>
          </div>
        )}

        {type === 'secondBrain' && (
          <div className="flex-1 flex flex-col gap-2 animate-[float_6s_ease-in-out_infinite]" style={{ background: '#0d0d14' }}>
            {/* Top bar */}
            <div className="flex items-center justify-between px-2 py-1 rounded" style={{ background: '#13131f', border: '1px solid #A78BFA22' }}>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ background: '#A78BFA55' }} />
                <div className="w-14 h-2 rounded" style={{ background: '#A78BFA33' }} />
              </div>
              <div className="flex gap-1">
                <div className="w-6 h-2 rounded-full" style={{ background: '#A78BFA44' }} />
                <div className="w-6 h-2 rounded-full" style={{ background: '#ffffff11' }} />
              </div>
            </div>
            {/* Note cards grid */}
            <div className="grid grid-cols-2 gap-1.5 flex-1">
              {[
                { color: '#A78BFA', icon: '📄', tag: 'AI' },
                { color: '#34D399', icon: '🔗', tag: 'Web' },
                { color: '#F472B6', icon: '📚', tag: 'PDF' },
                { color: '#60A5FA', icon: '📝', tag: 'Note' },
              ].map(({ color, icon, tag }, i) => (
                <div key={i} className="rounded p-1.5 flex flex-col gap-1" style={{ background: '#1a1a2e', border: `1px solid ${color}33` }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px]">{icon}</span>
                    <span className="text-[7px] px-1 rounded-full font-code" style={{ background: `${color}33`, color }}>{tag}</span>
                  </div>
                  <div className="w-full h-1.5 rounded" style={{ background: '#ffffff15' }} />
                  <div className="w-[70%] h-1.5 rounded" style={{ background: '#ffffff0d' }} />
                </div>
              ))}
            </div>
            {/* AI chat bubble */}
            <div className="flex flex-col gap-1">
              <div className="self-end px-2 py-1 rounded-xl rounded-tr-none text-[8px] font-code" style={{ background: '#A78BFA', color: '#fff', maxWidth: '80%' }}>
                What did I save about focus?
              </div>
              <div className="self-start px-2 py-1 rounded-xl rounded-tl-none text-[8px] font-code" style={{ background: '#1a1a2e', color: '#ffffff88', border: '1px solid #A78BFA33', maxWidth: '85%' }}>
                ✦ Found 4 related notes on deep work…
              </div>
            </div>
          </div>
        )}

        {type === 'aiShop' && (
          <div className="flex-1 flex flex-col gap-2 animate-[float_6s_ease-in-out_infinite]" style={{ background: '#0d0d12' }}>
            {/* Dark header bar */}
            <div className="flex items-center justify-between px-2 py-1 rounded" style={{ background: '#1a1a24' }}>
              <div className="w-14 h-2.5 rounded" style={{ background: '#6C63FF44' }} />
              <div className="flex gap-1">
                <div className="w-5 h-2 rounded-full" style={{ background: '#6C63FF55' }} />
                <div className="w-5 h-2 rounded-full" style={{ background: '#FF6B9D44' }} />
              </div>
            </div>
            {/* Product grid row */}
            <div className="grid grid-cols-3 gap-1.5">
              {['#6C63FF', '#FF6B9D', '#45E5C8'].map((c, i) => (
                <div key={i} className="rounded p-1.5 flex flex-col gap-1" style={{ background: '#1a1a24', border: `1px solid ${c}33` }}>
                  <div className="w-full aspect-square rounded" style={{ background: `linear-gradient(135deg, ${c}22, ${c}44)` }} />
                  <div className="w-8 h-1.5 rounded" style={{ background: '#ffffff22' }} />
                  <div className="w-5 h-2 rounded" style={{ background: `${c}66` }} />
                </div>
              ))}
            </div>
            {/* AI chat bubble */}
            <div className="flex flex-col gap-1 mt-auto">
              <div className="self-end px-2 py-1 rounded-xl rounded-tr-none text-[8px] font-code" style={{ background: '#6C63FF', color: '#fff', maxWidth: '80%' }}>
                Show jackets under $500
              </div>
              <div className="self-start px-2 py-1 rounded-xl rounded-tl-none text-[8px] font-code" style={{ background: '#1a1a24', color: '#ffffff99', border: '1px solid #6C63FF33', maxWidth: '80%' }}>
                ✦ Found 3 jackets for you!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
