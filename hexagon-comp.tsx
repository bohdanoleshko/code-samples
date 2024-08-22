import { cn } from "@/lib/utils";

export default function Hexagon({
  className,
  children,
  rounded = 3,
  image,
  filterId,
  hexagonClassName,
  element,
}: {
  className?: string;
  children: React.ReactNode;
  rounded?: number;
  image?: string;
  filterId: string;
  element?: React.ReactNode;
  hexagonClassName?: string;
}) {
  return (
    <div className={cn(className)}>
      {element}
      <div
        style={{
          width: "100%",
          height: "100%",
          filter: `url(#${filterId})`,
        }}
      >
        <div
          className={cn(hexagonClassName, "box")}
          {...(image && {
            style: {
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            },
          })}
        >
          {children}
        </div>
        <svg className="flt_svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id={filterId}>
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={rounded}
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="flt_tag"
              />
              <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}
