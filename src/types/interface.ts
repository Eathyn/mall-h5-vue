export interface IconProps {
  name: string // 图标名称或图片链接
  color?: string // 图标颜色
  size?: string // 图标大小
}

export interface GridProps {
  column: number
  row: number
}

export interface GridItemProps {
  iconName: string // 图标名称或图片链接
  iconColor?: string // 图标颜色
  iconSize?: string // 图标大小
  text: string
}
