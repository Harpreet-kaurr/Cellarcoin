import { Fragment } from "react";
import BaseVendor from "../../layout/BaseVendor";
import MultiVendor from "../../modules/Vendors Panel/MultiVendor";

export default function home() {
    return (
        <Fragment>  
            <BaseVendor>
                <MultiVendor></MultiVendor>
            </BaseVendor>
        </Fragment>
    );
}