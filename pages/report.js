import { Fragment } from "react";
import BaseVendor from ".././layout/BaseVendor";
import Reports from "../modules/Vendors Panel/Reports";

export default function home() {
    return (
        <Fragment>  
            <BaseVendor>
                <Reports></Reports>
            </BaseVendor>
        </Fragment>
    );
}