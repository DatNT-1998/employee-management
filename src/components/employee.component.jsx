import React, { Component } from "react";
import { Table, Space, Modal, Input, Button, Form, InputNumber } from "antd";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { addEmployee, setListEmployee, delEmployee } from "../redux/employee/employee.action";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 16,
        span: 8,
    },
};

const { confirm } = Modal;


class employee extends Component {
    formRef = React.createRef();


    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isAddNew: false,
            employee: {
                key: '',
                name: '',
                dateOfBirth: '',
                adress: '',
            },

        };
        this.biggestId = 0;
    }

    componentDidMount() {
        fetch("https://5f851ca6c29abd0016190236.mockapi.io/emloyees")
            .then(data => data.json())
            .then(res => {
                this.props.setListEmployee(res);
                this.biggestId = res[res.length - 1].key;
                console.log("biggestId", this.biggestId)
            })
    }


    columns = [
        {
            align: "center",
            title: "STT",
            dataIndex: "key",
            key: "key",
            //   render: (text) => <a href="/">{text}</a>,
        },
        {
            align: "center",
            title: "Tên nhân viên",
            dataIndex: "name",
            key: "name",
        },
        {
            align: "center",
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
        },
        {
            align: "center",
            title: "Quê Quán",
            dataIndex: "adress",
            key: "adress",
        },
        {
            align: "center",
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <FaPencilAlt className="styled-icon" onClick={() => this.showModalDetail(record)} />
                    <FaTrashAlt className="styled-icon" onClick={this.showModalBan} />
                </Space>
            ),
        },
    ];


    showModalBan = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa người dùng này không ?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    showModalDetail = (record) => {
        this.setState({
            visible: true,
            isAddNew: false,
            employee: {
                key: record.key,
                name: record.name,
                dateOfBirth: record.dateOfBirth,
                adress: record.adress
            }
        })
    }

    showModalAdd = () => {
        console.log("do dai cua mang", this.props.employees.length)
        let dodai = this.props.employees.length;
        this.setState({
            visible: true,
            isAddNew: true,
            employees: {
                key: dodai++,
                name: '',
                dateOfBirth: '',
                adress: '',
            }
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            employee: {
                name: '',
                dateOfBirth: '',
                adress: '',
            }
        });
    };

    handleChange = (evt) => {
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    };

    handleAddEmployee = () => {
        console.log("item", this.formRef.current.getFieldsValue())

        const fieldValue = this.formRef.current.getFieldsValue();

        this.props.addEmployee({
            key: ++this.biggestId,
            name: fieldValue.username,
            dateOfBirth: fieldValue.dateOfBirth,
            adress: fieldValue.adress
        })
    }

    render() {
        const { isAddNew, visible, employee } = this.state;
        const { employees } = this.props;
        return (
            <div className="admin-management">
                <div className="feature-add">
                    <h2> Danh sách nhân viên </h2>
                    <div style={{ display: "flex", marginBottom: "16" }} onClick={this.showModalAdd}>
                        <MdAddCircle size="20" className="styled-icon" />
                        <span style={{ marginLeft: 4 }} className="styled-icon"> Thêm nhân viên</span>
                    </div>
                </div>


                <Table dataSource={employees} columns={this.columns} bordered />

                {/* Modal Add and Detail */}.

                <Modal
                    title={
                        isAddNew ? 'Thêm nhân viên' : 'Sửa thông tin nhân viên'
                    }
                    visible={visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Form ref={this.formRef} name="dynamic_rule" {...layout}  >
                        {/* <Form.Item initialValue={employee.key} label="Id" name="key">
                            <InputNumber disabled />
                        </Form.Item> */}
                        <Form.Item initialValue={employee.name} label="Tên nhân viên" name="username">
                            <Input />
                        </Form.Item>
                        <Form.Item initialValue={employee.dateOfBirth} label="Ngày sinh" name="dateOfBirth">
                            <Input />
                        </Form.Item>
                        <Form.Item initialValue={employee.adress} label="Quê quán" name="adress">
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout} style={{ marginBottom: '12px' }}>
                            <Button type="primary" onClick={this.handleCancel} style={{ width: '64px' }} >
                                Hủy
                            </Button>
                            <Button type="primary" style={{ marginLeft: 12, width: '64px' }} onClick={isAddNew ? this.handleAddEmployee : ""}>
                                {isAddNew ? 'Thêm' : 'Lưu'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        employees: state.employee.employees
    }
}


const mapDispatchToProps = dispatch => {
    return {
        setListEmployee: (data) => dispatch(setListEmployee(data)),
        addEmployee: (item) => dispatch(addEmployee(item)),
        delEmployee: (item) => dispatch(delEmployee(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(employee);
