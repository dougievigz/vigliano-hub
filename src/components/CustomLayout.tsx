import { ThemedLayoutV2 } from "@refinedev/antd";
import type { ThemedLayoutV2Props } from "@refinedev/antd";

export const CustomLayout: React.FC<ThemedLayoutV2Props> = ({ children, ...props }) => {
  return (
    <ThemedLayoutV2
      {...props}
      Title={() => null}
      Sider={() => (
        <ThemedLayoutV2.Sider
          fixed={true}
          render={({ items }) => {
            return (
              <div style={{ padding: "16px 0" }}>
                {items}
              </div>
            );
          }}
        />
      )}
    >
      {children}
    </ThemedLayoutV2>
  );
};
