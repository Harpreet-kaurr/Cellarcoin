
import { Fragment } from "react";
import BaseAdmin from "../layout/BaseAdmin";
import Vendor from "../modules/Admin Panel/Vendor";
export default function home() {
    return (
        <Fragment>  
            <BaseAdmin>
                <Vendor></Vendor>
            </BaseAdmin>
        </Fragment>
    );
}