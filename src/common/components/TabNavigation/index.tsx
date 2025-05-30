import clsx from "clsx";
import { useState } from "react";

export type tabMenuModel = {
  label: string;
  partial: React.ReactNode;
};

export type Props = {
  listMenu: tabMenuModel[];
  className?: string;
};

const TabNavigation = (props: Props) => {
  const { listMenu, className } = props;
  const [active, setActive] = useState<number>(0);
  return (
    <div>
      <div className="flex space-x-5 border-2 gap-5 p-1 mt-4 border-dashed rounded-3xl border-blue-600">
        {listMenu?.map((data, index) => (
          <div
            className={clsx(
              `cursor-pointer px-4 py-2 text-center w-full`,
              className,
              active === index &&
                "bg-blue-700 text-white border-b-2 border-blue-600 rounded-3xl"
            )}
            onClick={() => setActive(index)}
            key={index}
          >
            {data.label}
          </div>
        ))}
      </div>

      <div className="mt-4">{listMenu?.[active]?.partial}</div>
    </div>
  );
};

export default TabNavigation;
