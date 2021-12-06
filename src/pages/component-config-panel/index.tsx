import React, { useEffect, useState } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import {
  Tabs,
  Button,
  Modal,
  Table,
  Space,
  Tag,
  Form,
  Input,
  Select,
  Collapse,
} from 'antd'
import classNames from 'classnames'
import { useObservableState } from '@/common/hooks/useObservableState'
import { useExperimentGraph } from '@/pages/rx-models/experiment-graph'
import { ExperimentForm } from './form/experiment-config'
import { NodeFormDemo } from './form/node-config'
import css from './index.less'

const { Option } = Select
const { Panel } = Collapse

const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
]

const sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
}

interface Props {
  experimentId: string
  className?: string
}

export const ComponentConfigPanel: React.FC<Props> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { experimentId, className } = props
  const expGraph = useExperimentGraph(experimentId)
  const [activeNodeInstance] = useObservableState(
    () => expGraph.activeNodeInstance$,
  )

  const nodeId = activeNodeInstance && activeNodeInstance.id

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    const data = form.getFieldValue('sights')
    console.log(data)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
  ]

  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('Received values of form:', values)
  }

  useEffect(() => {
    form.setFieldsValue({
      sights: [
        {
          sightsaaa: [
            {
              price123: '312',
            },
            {
              price123: '312',
            },
          ],
          price: '123',
        },
        {
          sightsaaa: [
            {
              price123: '312',
            },
            {
              price123: '31',
            },
          ],
          price: '312',
        },
      ],
    })
  }, [form])

  const addRow = () => {
    const old = form.getFieldValue('sights')
    const newData = [
      ...old,
      {
        sightsaaa: [
          {
            price123: '312',
          },
          {
            price123: '312',
          },
        ],
        price: '123',
      },
      {
        sightsaaa: [
          {
            price123: '312',
          },
          {
            price123: '31',
          },
        ],
        price: '312',
      },
    ]
    form.setFieldsValue({ sights: newData })

    console.log(old)
  }

  const handleChange = () => {
    form.setFieldsValue({ sights: [] })
  }

  return (
    <div className={classNames(className, css.confPanel)}>
      <div className={css.setting}>
        <Tabs
          defaultActiveKey="setting"
          type="card"
          size="middle"
          tabPosition="top"
          destroyInactiveTabPane={true}
        >
          <Tabs.TabPane tab="参数设置" key="setting">
            <div className={css.form}>
              {nodeId && (
                <NodeFormDemo
                  name="节点参数"
                  nodeId={nodeId}
                  experimentId={experimentId}
                />
              )}
              {!nodeId && (
                <ExperimentForm name="实验设置" experimentId={experimentId} />
              )}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="全局参数" key="params">
            <Button type="primary" onClick={showModal}>
              submit
            </Button>
            <Table columns={columns} dataSource={data} />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <div className={css.footer} />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        width={800}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
        >
          {/*<Form.Item name="area" label="Area" rules={[{ required: true, message: 'Missing area' }]}>*/}
          {/*  <Select options={areas} onChange={handleChange} />*/}
          {/*</Form.Item>*/}
          {/*<Form.Item name="area" label="Area" rules={[{ required: true, message: 'Missing area' }]}>*/}
          {/*  <Select options={areas} onChange={handleChange} />*/}
          {/*</Form.Item>*/}
          <Form.List name="sights">
            {(fields, { add, remove }) => (
              <>
                <Collapse defaultActiveKey={['0', '1']}>
                  {fields.map((field) => (
                    <Panel
                      header={
                        <Form.Item
                          {...field}
                          label="视图名"
                          name={[field.name, 'price']}
                          fieldKey={[field.fieldKey, 'price']}
                          rules={[{ required: true, message: 'Missing price' }]}
                        >
                          <Input />
                        </Form.Item>
                      }
                      key={field.key}
                    >
                      <Space key={field.key} align="baseline">
                        {/*<Form.Item*/}
                        {/*  {...field}*/}
                        {/*  label="Sight"*/}
                        {/*  name={[field.name, 'sight']}*/}
                        {/*  fieldKey={[field.fieldKey, 'sight']}*/}
                        {/*  rules={[{ required: true, message: 'Missing sight' }]}*/}
                        {/*>*/}
                        {/*  <Select style={{ width: 130 }}>*/}
                        {/*    {(sights.Tiananmen || []).map(item => (*/}
                        {/*      <Option key={item} value={item}>*/}
                        {/*        {item}*/}
                        {/*      </Option>*/}
                        {/*    ))}*/}
                        {/*  </Select>*/}
                        {/*</Form.Item>*/}
                        {/*<Form.Item*/}
                        {/*  {...field}*/}
                        {/*  label="Price"*/}
                        {/*  name={[field.name, 'price']}*/}
                        {/*  fieldKey={[field.fieldKey, 'price']}*/}
                        {/*  rules={[{ required: true, message: 'Missing price' }]}*/}
                        {/*>*/}
                        {/*  <Input />*/}
                        {/*</Form.Item>*/}
                        <Form.List
                          name={[field.name, 'sightsaaa']}
                          fieldKey={[field.fieldKey, 'sightsaaa']}
                        >
                          {(fieldsa, { add: add1, remove: remove1 }) => (
                            <>
                              {fieldsa.map((field) => (
                                <div>
                                  {/*<Form.Item*/}
                                  {/*  {...field}*/}
                                  {/*  label="Sight123"*/}
                                  {/*  name={[field.name, 'sight']}*/}
                                  {/*  fieldKey={[field.fieldKey, 'sight']}*/}
                                  {/*  rules={[{ required: true, message: 'Missing sight' }]}*/}
                                  {/*>*/}
                                  {/*  <Select style={{ width: 130 }}>*/}
                                  {/*    {(sights.Tiananmen || []).map(item => (*/}
                                  {/*      <Option key={item} value={item}>*/}
                                  {/*        {item}*/}
                                  {/*      </Option>*/}
                                  {/*    ))}*/}
                                  {/*  </Select>*/}
                                  {/*</Form.Item>*/}
                                  <Space key={field.key} align="baseline">
                                    <Form.Item
                                      {...field}
                                      label="列名称"
                                      name={[field.name, 'price123']}
                                      fieldKey={[field.fieldKey, 'price123']}
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Missing price',
                                        },
                                      ]}
                                    >
                                      <Input />
                                    </Form.Item>
                                    <Form.Item
                                      {...field}
                                      label="特征名称"
                                      name={[field.name, 'price123']}
                                      fieldKey={[field.fieldKey, 'price123']}
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Missing price',
                                        },
                                      ]}
                                    >
                                      <Input />
                                    </Form.Item>
                                    <MinusCircleOutlined
                                      onClick={() => remove1(field.name)}
                                    />
                                  </Space>
                                </div>
                              ))}

                              <Form.Item>
                                <Button
                                  type="dashed"
                                  onClick={() => add1()}
                                  block
                                  icon={<PlusOutlined />}
                                >
                                  添加一行数据
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>

                        {/*<MinusCircleOutlined onClick={() => remove(field.name)} />*/}
                      </Space>
                    </Panel>
                  ))}
                </Collapse>
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => addRow()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
