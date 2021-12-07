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

const defaultData = [
  {
    childrenForm: [
      {
        colName: '1',
        speName: '2',
      },
      {
        colName: '3',
        speName: '4',
      },
    ],
    viewName: '1',
  },
  {
    childrenForm: [
      {
        colName: '5',
        speName: '6',
      },
      {
        colName: '7',
        speName: '8',
      },
    ],
    viewName: '2',
  },
]

export const ComponentConfigPanel: React.FC<Props> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { experimentId, className } = props
  console.log(experimentId)
  const expGraph = useExperimentGraph(experimentId)
  const [activeNodeInstance] = useObservableState(
    () => expGraph.activeNodeInstance$,
  )

  const nodeId = activeNodeInstance && activeNodeInstance.id

  const [node] = useObservableState(() => expGraph.activeNodeInstance$)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    setIsModalVisible(false)
    const data = form.getFieldValue('sights')
    // await expGraph.updateNodeExtraData(nodeId, data)

    console.log(data)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const [form] = Form.useForm()

  useEffect(() => {
    console.log(node, props)
  }, [node])

  const onFinish = (values) => {
    console.log('Received values of form:', values)
  }

  useEffect(() => {
    let data = node?.extraData || defaultData
    form.setFieldsValue({ sights: data })
  }, [form, node])

  const addRow = () => {
    const old = form.getFieldValue('sights')
    const newData = [...old, ...defaultData]
    form.setFieldsValue({ sights: newData })

    console.log(old)
  }

  const handleChange = () => {
    form.setFieldsValue({ sights: [] })
  }

  const handleClick = (evt) => {
    evt.stopPropagation()
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
                          name={[field.name, 'viewName']}
                          fieldKey={[field.fieldKey, 'viewName']}
                          rules={[
                            { required: true, message: 'Missing viewName' },
                          ]}
                        >
                          <Input onClick={handleClick} />
                        </Form.Item>
                      }
                      key={field.key}
                    >
                      <Form.List name={[field.name, 'childrenForm']}>
                        {(
                          childrenFields,
                          { add: childrenAdd, remove: childrenRemove },
                        ) => (
                          <>
                            {childrenFields.map((field) => (
                              <Space key={field.key} align="baseline">
                                <Form.Item
                                  {...field}
                                  label="列名称"
                                  name={[field.name, 'colName']}
                                  fieldKey={[field.fieldKey, 'colName']}
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
                                  name={[field.name, 'speName']}
                                  fieldKey={[field.fieldKey, 'speName']}
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
                                  onClick={() => childrenRemove(field.name)}
                                />
                              </Space>
                            ))}

                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => childrenAdd()}
                                block
                                icon={<PlusOutlined />}
                              >
                                添加一行数据
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Panel>
                  ))}
                </Collapse>
                <Form.Item className="mt-2">
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
        </Form>
      </Modal>
    </div>
  )
}
