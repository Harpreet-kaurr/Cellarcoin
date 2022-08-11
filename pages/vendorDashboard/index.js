
import { Fragment } from "react";
import BaseVendor from "../../layout/BaseVendor";
import Dashboard from '../../modules/Vendors Panel/Dashboard'

export default function home() {
    return (
        <Fragment>  
            <BaseVendor>
                <Dashboard></Dashboard>
            </BaseVendor>
        </Fragment>
    );
}