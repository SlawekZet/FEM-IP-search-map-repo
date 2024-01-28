interface DataBarElementProps {
  header: string;
  data: string;
}

export const DataBarElement: React.FC<DataBarElementProps> = ({
  header,
  data,
}) => {
  return (
    <div className="md:md:items-start md:md:p-6 md:lg:p-8 flex flex-col items-center w-full max-w-64 md:lg:max-w-60 md:md:max-w-40 p-3">
      <p className="text-dark-gray pb-2 text-xs font-bold uppercase tracking-widest">
        {header}
      </p>
      <h2 className="text-very-dark-gray font-bold md:lg:text-xl md:md:text-base text-xl text-center md:md:text-start ">
        {data}
      </h2>
    </div>
  );
};
