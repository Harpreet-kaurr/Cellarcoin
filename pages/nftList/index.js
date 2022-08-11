
import { Fragment } from "react";
import BaseVendor from "../../layout/BaseVendor";
import NFTList from '../../modules/Vendors Panel/NFTList'

export default function home() {
    return (
        <Fragment>  
            <BaseVendor>
                <NFTList></NFTList>
            </BaseVendor>
        </Fragment>
    );
}