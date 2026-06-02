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
    description: "기기를 보호하면서 일상 스타일을 완성하는 프리미엄 케이스",
    icon: Smartphone
  },
  {
    id: "chargers",
    name: "충전기",
    description: "PD, GaN 기반의 빠르고 안정적인 충전 솔루션",
    icon: PlugZap
  },
  {
    id: "power-banks",
    name: "보조배터리",
    description: "외출과 여행 중에도 안심할 수 있는 휴대용 전원",
    icon: BatteryCharging
  },
  {
    id: "earphones",
    name: "이어폰",
    description: "음악, 통화, 이동 시간을 더 선명하게 만드는 사운드 기어",
    icon: Headphones
  },
  {
    id: "phone-stands",
    name: "휴대폰 거치대",
    description: "책상과 차량에서 편안한 시야각을 제공하는 스탠드",
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
