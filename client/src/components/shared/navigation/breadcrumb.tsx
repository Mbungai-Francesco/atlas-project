import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbNavigation = () => {
  const { pathname } = useLocation();

  const pathNames = pathname.split("/").filter((path) => path);

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathNames.length > 0 && <BreadcrumbSeparator />}

        {pathNames.map((path, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let linkName = `${
            path[0].toUpperCase() + path.slice(1, path.length)
          }`;

          const isLastPath = pathNames.length === index + 1;
          if (linkName === "Dashboard") return (linkName = "Home");

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {!isLastPath ? (
                  <BreadcrumbLink asChild>
                    <Link to={href}>{linkName}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{linkName}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNavigation;
