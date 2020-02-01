import { observable } from "mobx";
import userService from "./../Services/user.service";
import { message } from "antd";

class UsersStore {
    @observable usFetchingList = true;
    @observable usersList = [];
    @observable viewAddEditModal = false;
    @observable AddEditRecord = null;
    @observable submiting = false


    @observable UserTypes = {
        1: "Patient",
        2: "Doctor",
        3: "Staff",
        4: "Other",
    }

    getUsersList = async () => {
        try {
            this.usFetchingList = true;
            const res = await userService.getList();
            this.usFetchingList = false;
            this.usersList = res.data
            console.log( "res", res )

        } catch ( error ) {
            this.usFetchingList = false;
            message.error( error, 3 )
        }
    }

    handleAddClick = ( e, record = null ) => {
        this.viewAddEditModal = !this.viewAddEditModal;
        this.AddEditRecord = record
    }

    handleSubmitForm = ( e, form ) => {
        e.preventDefault();
        form.validateFieldsAndScroll( async ( err, values ) => {
            
            if ( !err ) {
                try {
                    this.submiting = true;
                    if(this.AddEditRecord && this.AddEditRecord._id) {
                        values._id = this.AddEditRecord._id
                    }
                    const res = await userService.appUpdateUser(values);
                    console.log(values);
                    this.submiting = false;
                    this.viewAddEditModal = false;
                    this.getUsersList()    
                } catch ( e ) {

                }
            }
        } )
    }

}

export default UsersStore;