import React from "react";
import styles from "./PriceCard.module.css";
export interface TeamMember {
  name: string;
  designation: string;
  avatar: string;
}

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3 mt-8 ">
    <div
      className={`rounded-md overflow-hidden bg-[#343a40] py-4 ${styles.cusShadowOnHover}`}
    >
      <div className=" overflow-hidden flex justify-center items-center ">
        <img
          src={member.avatar}
          alt={member.name}
          className="h-64 w-11/12 object-cover rounded-md"
        />
      </div>
      <div className="p-4 text-white ">
        <h4 className="font-semibold text-lg">{member.name}</h4>
        <span className="text-md ">{member.designation}</span>
      </div>
    </div>
  </div>
);

export default TeamCard;
