import tunnel from "tunnel-rat";

const t = tunnel();
export const InsertOverlay = ({ children = null }) => {
  return (
    <>
      <t.In>{children}</t.In>
    </>
  );
};

export const OverlayOut = ({}) => {
  return (
    <>
      <t.Out></t.Out>
    </>
  );
};
