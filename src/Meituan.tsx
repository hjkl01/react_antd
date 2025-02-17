import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown, Space, Tag } from "antd";
import { useRef } from "react";
import request from "umi-request";
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type MeituanItem = {
  id: number;
  name: string;
  distance: string;
  avgPrice: string;
  avgScore: string;
  cateName: string;
  frontImg: string;
  lat: number;
  lng: number;
  poiid: string;
  areaName: string;
  rotationTags: string;
  preferentialInfo: string;

  created_time: string;
  updated_time: string;
};

const columns: ProColumns<MeituanItem>[] = [
  {
    dataIndex: "index",
    valueType: "indexBorder",
    width: 40,
  },
  {
    title: "店铺",
    dataIndex: "name",
    copyable: true,
    ellipsis: true,
    tip: "标题过长会自动收缩",
    formItemProps: {
      rules: [
        {
          required: true,
          message: "此项为必填项",
        },
      ],
    },
  },
  {
    disable: true,
    title: "类别",
    dataIndex: "cateName",
  },
  {
    disable: true,
    title: "距离",
    dataIndex: "distance",
  },
  {
    title: "创建时间",
    key: "showTime",
    dataIndex: "created_time",
    valueType: "date",
    sorter: true,
    hideInSearch: true,
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    valueType: "dateRange",
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
];

function Meituan() {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<MeituanItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        // console.log(sort, filter);
        await waitTime(100);

        // console.log(params);
        params.page = params.current;
        delete params.current;
        delete params.pageSize;

        let baseUrl = "https://me.hjkl01.cn:19001/api/meituan";
        const msg = await request.get(baseUrl, {
          params: params,
        });

        return {
          data: msg.results,
          success: true,
          total: msg.count,
        };
      }}
      editable={{
        type: "multiple",
      }}
      columnsState={{
        persistenceKey: "pro-table-singe-demos",
        persistenceType: "localStorage",
        onChange(value) {
          console.log("value: ", value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: "auto",
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === "get") {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 15,
        onChange: (page) => console.log("page", page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
        // <Dropdown
        //   key="menu"
        //   menu={{
        //     items: [
        //       {
        //         label: "1st item",
        //         key: "1",
        //       },
        //       {
        //         label: "2nd item",
        //         key: "1",
        //       },
        //       {
        //         label: "3rd item",
        //         key: "1",
        //       },
        //     ],
        //   }}
        // >
        //   <Button>
        //     <EllipsisOutlined />
        //   </Button>
        // </Dropdown>,
      ]}
    />
  );
}
export default Meituan;
