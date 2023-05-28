type FoodTypeClasses = {
  [key: string]: {
    border: string;
    circle: string;
    text: string;
  };
};

export default function FoodType({ type }: { type: string }) {
  const classes: FoodTypeClasses = {
    VEG: {
      border: "border-green-500",
      circle: "bg-green-500",
      text: "text-green-500",
    },
    EGG: {
      border: "border-orange-900",
      circle: "bg-orange-900",
      text: "text-orange-900",
    },
    NON_VEG: {
      border: "border-red-500",
      circle: "bg-red-500",
      text: "text-red-500",
    },
    VEGAN: {
      border: "border-yellow-500",
      circle: "bg-yellow-500",
      text: "text-yellow-500",
    },
    other: {
      border: "border-gray-500",
      circle: "bg-gray-500",
      text: "text-gray-500",
    },
  };

  // Check if the type value is valid, otherwise fallback to 'other'
  const typeClass = classes[type] || classes.other;

  return (
    <div className="flex flex-row my-auto mt-[0.275rem] space-x-2 shrink-0">
      <div
        className={`flex flex-row w-[0.825rem] h-[0.825rem] border-2 ${typeClass.border}`}
      >
        <div
          className={`m-auto rounded-full p-[0.125rem] w-[0.4rem] h-[0.4rem] ${typeClass.circle}`}
        ></div>
      </div>
    </div>
  );
}
