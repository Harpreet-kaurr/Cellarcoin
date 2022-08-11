import { Fragment } from "react";
import BaseVendor from "../../layout/BaseVendor";
import SellNFT from "../../modules/Vendors Panel/SellNFT";

export default function home() {
    return (
        <Fragment>  
            <BaseVendor>
                <SellNFT></SellNFT>
            </BaseVendor>
        </Fragment>
    );
}