import { Fragment } from "react";
import BaseVendor from "../../layout/BaseVendor";
import Listing from '../../modules/Vendors Panel/Listing'

export default function home() {
    return (
        <Fragment>  
            <BaseVendor>
                <Listing></Listing>
            </BaseVendor>
        </Fragment>
    );
}