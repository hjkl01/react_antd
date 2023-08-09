import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown, Space, Tag, message } from "antd";
import { useRef, useState } from "react";
import request from "./api/request.tsx";

import config from "./config.tsx";

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

type IttItem = {
  id: number;
  prodCode: string;
  descriptionEN: string;
  descriptionCN: string;
  exportCountry: string;
  importCountry: string;
  exportcountryNameCN: string;
  importcountryNameCN: string;
  currencyType: string;
  taxRateMFNAgreement: string;
  taxRateMFNAgreementName: string;
  taxRateMFN: string;
  taxRateASEANAgreement: string;
  taxRateASEANAgreementName: string;
  taxRateASEAN: string;
  taxRateRCEP_ASEANAgreement: string;
  taxRateRCEP_ASEANAgreementName: string;
  taxRateRCEP_ASEAN: string;
  taxRateZZAgreement: string;
  taxRateZZAgreementName: string;
  taxRateZZ: string;
  eXCISEFeeName: string;
  eXCISEFeeCurrency: string;
  eXCISEFeeDesc: string;
  eXCISEFeeRate: string;
  eXCISEFeeType: string;
  vATFeeName: string;
  vATFeeCurrency: string;
  vATFeeDesc: string;
  vATFeeRate: string;
  vATFeeType: string;
};

const columns: ProColumns<IttItem>[] = [
  {
    dataIndex: "index",
    valueType: "indexBorder",
    width: 40,
  },
  {
    disable: true,
    title: "商品编码",
    // search: false,
    filters: true,
    onFilter: true,
    tip: "搜索该项时需要完全匹配",
    dataIndex: "prodCode",
  },
  {
    title: "描述",
    dataIndex: "descriptionCN",
    copyable: true,
    ellipsis: true,
    tip: "搜索该项时为包含关系",
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
    title: "原产地",
    // search: false,
    dataIndex: "exportcountryNameCN",
  },
  {
    disable: true,
    title: "目的地",
    // search: false,
    dataIndex: "importcountryNameCN",
  },

  {
    disable: true,
    title: "最惠税率(MFN)",
    search: false,
    dataIndex: "taxRateMFN",
  },
  {
    disable: true,
    title: "消费税",
    search: false,
    dataIndex: "eXCISEFeeRate",
  },
  {
    disable: true,
    title: "增值税",
    search: false,
    dataIndex: "vATFeeRate",
  },
];

function Itt() {
  const [response, setResponse] = useState("");
  const actionRef = useRef<ActionType>();

  if (localStorage.getItem("access") == null) {
    window.location.href = "/";
  }

  return (
    <ProTable<IttItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}) => {
        // console.log(sort, filter);
        await waitTime(100);

        console.log("params" + params.current);

        if ("descriptionCN" in params) {
          delete params.prodCode;
          var Url =
            config.baseUrl + "/api/itt/descCN/" + "?page=" + params.current;
        } else {
          var Url = config.baseUrl + "/api/itt/" + "?page=" + params.current;
        }

        const response = await request(Url, {
          ...params,
        })
          .then((res) => {
            const result = {
              data: res.results,
              total: res.count,
              success: true,
              pageSize: 15,
              current: params.current,
            };
            return result;
          })
          .catch((err) => console.log(err));
        return Promise.resolve(response);
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
      ]}
    />
  );
}
export default Itt;
