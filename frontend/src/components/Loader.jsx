import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
    return (
        <Oval
            height={80}
            width={80}
            color="black"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="black"
            strokeWidth={2}
            strokeWidthSecondary={2}
        />
    );
};

export default Loader;
