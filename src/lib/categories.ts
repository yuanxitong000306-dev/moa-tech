import {
  BatteryCharging,
  Cable,
  Headphones,
  PlugZap,
  Smartphone,
  TabletSmartphone
} from "lucide-react";

export const categories = [
  {
    id: "phone-cases",
    name: "휴대폰 케이스",
    description: "기기를 보호하면서 일상 스타일을 완성하는 케이스",
    icon: Smartphone
  },
  {
    id: "chargers",
    name: "충전기",
    description: "PD, GaN 기반의 고속 충전 솔루션",
    icon: PlugZap
  },
  {
    id: "power-banks",
    name: "보조배터리",
    description: "외출과 이동 중에도 안정적인 휴대 전원",
    icon: BatteryCharging
  },
  {
    id: "earphones",
    name: "이어폰",
    description: "음악, 통화, 이동에 어울리는 프리미엄 오디오",
    icon: Headphones
  },
  {
    id: "phone-stands",
    name: "휴대폰 거치대",
    description: "책상과 차량에서 편하게 쓰는 스탠드",
    icon: TabletSmartphone
  },
  {
    id: "cables",
    name: "데이터 케이블",
    description: "안정적인 충전과 데이터 전송을 위한 케이블",
    icon: Cable
  }
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export function getCategory(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}
