import { PagedSettingsContainer } from "@/src/components/PagedSettingsContainer";
import Header from "@/src/components/layouts/header";
import { MembershipInvitesPage } from "@/src/features/rbac/components/MembershipInvitesPage";
import { MembersTable } from "@/src/features/rbac/components/MembersTable";
import { JSONView } from "@/src/components/ui/CodeJsonViewer";
import RenameOrganization from "@/src/features/organizations/components/RenameOrganization";
import { useQueryOrganization } from "@/src/features/organizations/hooks";
import { useRouter } from "next/router";
import { SettingsDangerZone } from "@/src/components/SettingsDangerZone";
import { DeleteOrganizationButton } from "@/src/features/organizations/components/DeleteOrganizationButton";
import { BillingSettings } from "@/src/ee/features/billing/components/BillingSettings";
import { useHasEntitlement } from "@/src/features/entitlements/hooks";
import ContainerPage from "@/src/components/layouts/container-page";

const OrgSettingsPage = () => {
  const organization = useQueryOrganization();
  const router = useRouter();
  const { page } = router.query;
  const showBillingSettings = useHasEntitlement("cloud-billing");

  if (!organization) return null;

  return (
    <ContainerPage
      headerProps={{
        title: "Organization Settings",
      }}
    >
      <PagedSettingsContainer
        activeSlug={page as string | undefined}
        pages={[
          {
            title: "General",
            slug: "index",
            content: (
              <div className="flex flex-col gap-6">
                <RenameOrganization />
                <div>
                  <Header title="Debug Information" />
                  <JSONView
                    title="Metadata"
                    json={{ name: organization.name, id: organization.id }}
                  />
                </div>
                <SettingsDangerZone
                  items={[
                    {
                      title: "Delete this organization",
                      description:
                        "Once you delete an organization, there is no going back. Please be certain.",
                      button: <DeleteOrganizationButton />,
                    },
                  ]}
                />
              </div>
            ),
          },
          {
            title: "Members",
            slug: "members",
            content: (
              <div className="flex flex-col gap-6">
                <div>
                  <Header title="Organization Members" />
                  <MembersTable orgId={organization.id} />
                </div>
                <div>
                  <MembershipInvitesPage orgId={organization.id} />
                </div>
              </div>
            ),
          },
          //! AIM Tracer
          // {
          //   title: "Billing",
          //   slug: "billing",
          //   content: <BillingSettings />,
          //   show: showBillingSettings,
          // },
          {
            title: "Projects",
            slug: "projects",
            href: `/organization/${organization.id}`,
          },
        ]}
      />
    </ContainerPage>
  );
};

export default OrgSettingsPage;
