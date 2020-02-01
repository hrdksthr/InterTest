import React from "react";
import moment from "moment";
import { Button, Table } from "antd"
import { observer } from "mobx-react";

@observer
class UserTabel extends React.Component {
    render() {
        const {
            users: {
                usersList,
                usFetchingList,
                UserTypes,
                handleAddClick
            }
        } = this.props;
        const dataSource = usersList; 
        const columns = [
          {
            title: 'Name',
            dataIndex: 'user_fname',
            key: 'user_fname',
            render: (text, record) => <span> {record.user_fname} {record.user_lname}</span>
          },
          {
            title: 'Birthday',
            dataIndex: 'user_bday',
            key: 'user_bday',
            render: (text) => moment(text).format("DD MMM, YYYY") 
          },
          {
            title: 'Role',
            dataIndex: 'user_role',
            key: 'user_role',
            render:(text, record) => <span> {text === 4 || text === "4" ? record.other_role : UserTypes[text]} </span>
          },
          {
            title: 'Actions',
            key: 'action',
            render: (text, record) => {
                return (
                    <Button type="primary" shape="circle" icon="form" onClick={e => handleAddClick(e, record)}/>
                )
            }
          },
        ];
        return (
              <Table dataSource={dataSource} loading={usFetchingList} columns={columns} pagination={false}/>
        )
    }
   
}

export default UserTabel