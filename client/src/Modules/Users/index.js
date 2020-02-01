import React from "react";
import UserTabel from "./UserTable/index";
import AddEditUserModal from "./UserModal";
import { Button, Layout } from "antd"
import { observer } from "mobx-react";
@observer
class UsersComponent extends React.Component {
    componentDidMount() {
        const {
            users: {
                getUsersList,
            }
        } = this.props;
        getUsersList()
    }
    render() {
        const {
            users: {
                handleAddClick
            }
        } = this.props;
        return <div style={{
            padding: "0px 150px"
        }}>
            <div style={ {
                height: "50px"
            } }>
                <Button 
                type="primary" 
                style={ { float: "right" } }
                onClick={(e) => handleAddClick(e)}>Add New User </Button>
            </div>
            <Layout>
                <Layout>
                    <UserTabel { ...this.props } />
                </Layout>
            </Layout>
            <AddEditUserModal { ...this.props } />
        </div>
    }
}

export default UsersComponent