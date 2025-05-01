type GlassmorphismProps = {
  container?: boolean;
  border?: boolean;
  hover?: boolean;
  input?: boolean;
};
const glassmorphism = (props: GlassmorphismProps) => {
  const { container, border, hover, input } = props;

  let classes = "";
  if (container) {
    classes += "bg-fuchsia-300/5 ";
  }

  if (hover) {
    classes += "hover:bg-violet-300/10 transition-all duration-200 ";
  }

  if (border) {
    classes += "border border-purple-700/20 ";
  }

  if (input) {
    classes += "border text-black p-2 w-full rounded-lg ";
  }

  return classes.trim();
};

export default glassmorphism;
