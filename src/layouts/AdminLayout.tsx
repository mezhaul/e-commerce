import { Component } from "solid-js";
import AdminNav from "../components/navigation/AdminNav";

const AdminLayout:Component = ({children}: any) => {
    return (
        <div class="w-11/12 m-auto pt-16 md:pt-20 flex gap-3">
            <div class="hidden lg:block w-[330px] border bg-gray-200 rounded-sm">
                <AdminNav />
            </div>
            <div class="w-full relative lg:h-[87vh] lg:bg-gray-200 lg:p-5 lg:border lg:rounded-sm">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout;
