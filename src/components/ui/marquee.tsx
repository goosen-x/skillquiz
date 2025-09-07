export default function Marquee({ items }: { items: string[] }) {
  return (
    <div
      className="relative w-full overflow-hidden my-8"
      style={{ transform: 'rotate(-2deg)', marginLeft: '-5%', marginRight: '-5%', width: '110%' }}
    >
      <div className="flex w-full overflow-x-hidden border-b-4 border-t-4 border-border bg-main text-foreground shadow-[0_4px_0px_0px_theme(colors.border)] font-base">
        <div className="animate-marquee whitespace-nowrap py-8">
          {items.map((item) => {
            return (
              <span key={item} className="mx-6 text-3xl font-bold uppercase">
                {item}
              </span>
            );
          })}
        </div>

        <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-8">
          {items.map((item) => {
            return (
              <span key={item} className="mx-6 text-3xl font-bold uppercase">
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
