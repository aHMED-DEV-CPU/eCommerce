export default function RecentProducts({ product }) {
  return (
    <>
      <div className=" p-3 ">
        <img src={product?.imageCover} alt={product?.title} />
        <h3 className=" text-green-500">{product?.category?.name}</h3>
        <h6 className="dark:text-slate-200">
          {product?.title?.split(" ").slice(0, 2).join(" ")}
        </h6>
        <div className=" flex justify-between dark:text-slate-200">
          <span>{product?.price}EGP</span>
          <span>
            <i className="fa-solid fa-star text-yellow-400"></i>
            <span className=" text-slate-500 dark:text-slate-200">
              {product?.ratingsAverage}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
