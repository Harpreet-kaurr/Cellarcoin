import { Fragment } from "react";
import BaseVendor from "../../layout/BaseVendor";
import CreateNFT from "../../modules/Vendors Panel/CreateNFT";

export default function home() {
    return (
        <Fragment>  
            <BaseVendor>
                <CreateNFT></CreateNFT>
            </BaseVendor>
        </Fragment>
    );
}