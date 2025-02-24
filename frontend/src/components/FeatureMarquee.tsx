import type React from "react"

interface FeatureMarqueeProps {
  features: string[]
}

const FeatureMarquee: React.FC<FeatureMarqueeProps> = ({ features }) => {
  return (
    <div className="bg-primary text-primary-foreground py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {features.concat(features).map((feature, index) => (
          <span key={index} className="mx-4 text-lg font-semibold">
            {feature}
          </span>
        ))}
      </div>
    </div>
  )
}

export default FeatureMarquee

