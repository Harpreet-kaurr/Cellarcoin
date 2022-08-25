
import { Fragment } from "react";
import BaseAdmin from "../layout/BaseAdmin";
import Listing from "../modules/Admin Panel/Listing";
export default function home() {
    return (
        <Fragment>  
            <BaseAdmin>
                <Listing></Listing>
            </BaseAdmin>
        </Fragment>
    );
}