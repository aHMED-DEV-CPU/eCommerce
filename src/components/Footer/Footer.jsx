import send from "../../assets/footer/Vector.png";
import QR from "../../assets/footer/Frame 719.png";

export default function Footer() {
  return (
    <>
      <div className=" bg-green-900 flex flex-wrap px-7 pt-8 pb-5 ">
        <div className=" xl:w-1/5  sm:w-1/3 w-full text-center sm:text-left mb-4 ">
          <div className="inner text-[#FAFAFA] text-2xl px-4 ">
            <h5 className="inner font-bold mb-5">FreshCart</h5>
            <p className=" poppins text-xl font-medium mb-4">Subscribe</p>
            <div>
              <label
                htmlFor="sale"
                className=" poppins text-[#FAFAFA] text-base "
              >
                Get 10% off your first order
              </label>
              <div className=" flex justify-center sm:justify-start">
                {" "}
                <div className=" relative w-fit">
                  <button className=" absolute   bottom-3 right-3 bg-green-900 ">
                    <img src={send} />
                  </button>
                  <input
                    type="email"
                    id="sale"
                    placeholder="Enter you email"
                    className=" bg-green-900 border-[#FAFAFA] mt-3  p-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:w-1/5  sm:w-1/3 w-full text-center sm:text-left mb-4 ">
          <div className="inner text-[#FAFAFA] px-4">
            <h5 className=" poppins font-medium mb-5 text-xl">Support</h5>
            <p className="poppins">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <small className="poppins block my-5">FreshCart@gmail.com</small>
            <small className="poppins">+88015-88888-9999</small>
          </div>
        </div>
        <div className="xl:w-1/5  sm:w-1/3 w-full text-center sm:text-left mb-4 ">
          <div className="inner text-[#FAFAFA]  px-4">
            <h5 className=" poppins font-medium mb-5 text-xl">Account</h5>
            <ul>
              <li className=" poppins mb-3">My Account</li>
              <li className=" poppins mb-3">Login / Register</li>
              <li className=" poppins mb-3">Cart</li>
              <li className=" poppins mb-3">Wishlist</li>
              <li className=" poppins mb-3">Shop</li>
            </ul>
          </div>
        </div>
        <div className="xl:w-1/5  sm:w-1/3 w-full text-center sm:text-left mb-4 ">
          <div className="inner text-[#FAFAFA] px-4">
            <h5 className=" poppins font-medium mb-5 text-xl">Quick Link</h5>
            <ul>
              <li className=" poppins mb-3">Privacy Policy</li>
              <li className=" poppins mb-3">Terms Of Use</li>
              <li className=" poppins mb-3">FAQ</li>
              <li className=" poppins mb-3">Contact</li>
            </ul>
          </div>
        </div>
        <div className="xl:w-1/5  sm:w-1/3 w-full text-center sm:text-left mb-4 ">
          <div className="inner text-[#FAFAFA] px-4">
            <h5 className=" poppins font-medium mb-5 text-xl">Download App</h5>
            <small className=" poppins font-medium  text-[#9ca3af]">
              Save $3 with App New User Only
            </small>
            <div className=" mt-2 mb-4   flex justify-center sm:justify-start">
              <img src={QR} alt="" />
            </div>
            <ul className=" flex justify-center sm:justify-start">
              <li className=" text-[#FAFAFA] mx-3 ">
                <i className="fa-brands fa-facebook-f"></i>
              </li>
              <li className=" text-[#FAFAFA] mx-3 ">
                <i className="fa-brands fa-twitter"></i>
              </li>
              <li className=" text-[#FAFAFA] mx-3 ">
                <i className="fa-brands fa-instagram"></i>
              </li>
              <li className=" text-[#FAFAFA] mx-3 ">
                <i className="fa-brands fa-linkedin-in"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" border-t border-[#F9F9F933] bg-green-900 text-[#F9F9F933] py-4 text-center poppins">
        <i className="fa-regular fa-copyright inline-block me-3"></i>Copyright
        Ahmed 2024. All right reserved
      </div>
    </>
  );
}
