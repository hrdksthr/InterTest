import React from "react";
import { observer } from "mobx-react";
import moment from "moment"
import { Button, Modal, Form, Input, Row, Col, DatePicker, Radio } from "antd";

@observer
class AddEditUser extends React.Component {
    render() {
        console.log( "Form", this.props );

        const {
            users: {
                viewAddEditModal,
                AddEditRecord,
                handleSubmitForm,
                UserTypes,
                handleAddClick,
                submiting
            },
            form,
            form: {
                getFieldDecorator,
                getFieldValue
            }
        } = this.props
        console.log( "viewAddEditModal", getFieldValue("user_role"), typeof getFieldValue("user_role") );

        return (
            <Modal
                title={AddEditRecord && AddEditRecord._id ? "Edit User" : "Add User"}
                visible={ viewAddEditModal }
                footer={ [
                    <Button onClick={ e => handleAddClick( e ) }> Cancel</Button>,
                    <Button 
                        type="primary" 
                        loading={submiting} 
                        onClick={e => handleSubmitForm(e, form)}> 
                        {AddEditRecord && AddEditRecord._id ? "Edit User" : "Add User"}
                        </Button>
                ] }
            >
                <Form >
                    <Row>
                        <Col span={ 12 } >
                            <Form.Item label={"First Name"}>
                                { getFieldDecorator( 'user_fname', {
                                    rules: [ { required: true, message: 'Please input user first name!' } ],
                                    initialValue: AddEditRecord && AddEditRecord.user_fname
                                } )(
                                    <Input
                                        placeholder="User First Name"
                                    />,
                                ) }

                            </Form.Item>
                        </Col>
                        <Col span={ 12 } >
                            <Form.Item label={"Last Name"}>
                                { getFieldDecorator( 'user_lname', {
                                    rules: [ { required: true, message: 'Please input user last name!' } ],
                                    initialValue: AddEditRecord && AddEditRecord.user_lname
                                } )(
                                    <Input
                                        placeholder="User Last Name"
                                    />,
                                ) }                
                                </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label={"User Birthday"}>
                    { getFieldDecorator( 'user_bday', {
                        rules: [ { required: true, message: 'Please Select Birthdate of user!' } ],
                        initialValue: AddEditRecord ? moment(AddEditRecord.user_bday) : moment()
                    } )(
                        <DatePicker format={"MM/DD/YYYY"} />
                    ) }                
                    </Form.Item>
                    <Form.Item label={"User Role"}>
                    { getFieldDecorator( 'user_role', {
                        rules: [ { required: true, message: 'Please Select Birthdate of user!' } ],
                        initialValue: AddEditRecord && AddEditRecord.user_role
                    } )(
                        <Radio.Group>
                        {Object.keys(UserTypes).map(key => {
                            return <Radio key={Number(key)} value={Number(key)}>{UserTypes[key]}</Radio>
                        })}
                        </Radio.Group>
                    ) }                
                    </Form.Item>
                    {(getFieldValue("user_role") === 4) && (
                        <Form.Item label={"Other Role"}>
                                { getFieldDecorator( 'other_role', {
                                    rules: [ 
                                        { 
                                            required: (getFieldValue("user_role") === 4), 
                                            message: 'Please input role_name!' 
                                        } 
                                    ],
                                    initialValue: AddEditRecord && AddEditRecord.other_role
                                } )(
                                    <Input
                                        placeholder="User Role Name"
                                    />,
                                ) }                
                                </Form.Item>
                    )}
                </Form>
            </Modal>
        )
    }
}

export default Form.create()( AddEditUser )