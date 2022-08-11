import { Fragment } from "react";
import BaseVendor from "../../layout/BaseVendor";
import AllNFT from "../../modules/Vendors Panel/AllNFT";
import {getOnBoardFromCookie} from '../../auth/userCookies';

export default function home() {
    return (
        <Fragment>  
            <BaseVendor>
                <AllNFT></AllNFT>
            </BaseVendor>
        </Fragment>
    );
}

