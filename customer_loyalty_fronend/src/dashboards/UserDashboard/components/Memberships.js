import { useContext, useEffect, useState } from "react";
import { TitleContext } from "../../../context/TitleContext";
import UseFetch from "../../../custom/UseFetch";
import { AlertContex } from "../../../context/AlertContext";
import { AuthContext } from "../../../context/AuthContext";
import MembershipCard from "./MembershipCard";

const Memberships = () => {
  const { setTitle } = useContext(TitleContext);
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);

  const [memberships, setMemberships] = useState([]);
  const getMemberships = async () => {
    const response = await UseFetch(
      process.env.REACT_APP_API_MEMBERSHIPS,
      "GET",
      null,
      { "Content-Type": "Application/json", authorization: `Bearer ${token}` }
    );
    if (response.success) {
      toggleOn(response.messages, response.success);
      setMemberships([...response.data]);
    } else toggleOn(response.messages, response.success);
  };
  useEffect(() => {
    setTitle("Memberships");
    getMemberships();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {memberships.length === 0 ? (
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-8 text-center mt-10">
              You do not have any memberships yet.
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex-wrap -mx-3  ">
          <div className=" w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-6">
            {memberships?.map((membership, i) => (
              <MembershipCard
                key={i}
                membership={membership}
                memberships={memberships}
                setMemberships={setMemberships}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Memberships;
