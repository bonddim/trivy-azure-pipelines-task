import * as React from 'react';
import {
  AssuranceReport,
  countAssuranceIssues,
  countReportLicenses,
  countReportMisconfigurations,
  countReportSecrets,
  countReportVulnerabilities,
  Report,
} from './trivy';
import { SecretsTable } from './SecretsTable';
import { VulnerabilitiesTable } from './VulnerabilitiesTable';
import { MisconfigurationsTable } from './MisconfigurationsTable';
import { LicensesTable } from './LicenseTable';
import { Tab, TabBar, TabSize } from 'azure-devops-ui/Tabs';
import { AssuranceTable } from './AssuranceTable';

interface BaseReportProps {
  report: Report;
  assurance: AssuranceReport | undefined;
}

interface BaseReportState {
  selectedTabId: string;
}

export class BaseReport extends React.Component<
  BaseReportProps,
  BaseReportState
> {
  public props: BaseReportProps;

  constructor(props: BaseReportProps) {
    super(props);
    this.props = props;
    this.state = {
      selectedTabId: 'vulnerabilities',
    };
  }

  private onSelectedTabChanged = (newTabId: string) => {
    this.setState({ selectedTabId: newTabId });
  };

  render() {
    const vulnCount = countReportVulnerabilities(this.props.report);
    const misconfigCount = countReportMisconfigurations(this.props.report);
    const secretsCount = countReportSecrets(this.props.report);
    const licensesCount = countReportLicenses(this.props.report);
    const assuranceCount = countAssuranceIssues(this.props.assurance);

    return (
      <div className="flex-grow">
        <div className="flex-grow">
          <TabBar
            onSelectedTabChanged={this.onSelectedTabChanged}
            selectedTabId={this.state.selectedTabId}
            tabSize={TabSize.Tall}
          >
            {vulnCount > 0 && (
              <Tab
                id="vulnerabilities"
                name="Vulnerabilities"
                key="vulnerabilities"
                badgeCount={vulnCount}
              />
            )}
            {misconfigCount > 0 && (
              <Tab
                id="misconfigurations"
                name="Misconfigurations"
                key="misconfigurations"
                badgeCount={misconfigCount}
              />
            )}
            {secretsCount > 0 && (
              <Tab
                id="secrets"
                name="Secrets"
                key="secrets"
                badgeCount={secretsCount}
              />
            )}
            {licensesCount > 0 && (
              <Tab
                id="licenses"
                name="Licenses"
                key="licenses"
                badgeCount={licensesCount}
              />
            )}
            {assuranceCount > 0 && (
              <Tab
                id="assurance"
                name="Assurance Issues"
                key="assurance"
                badgeCount={assuranceCount}
              />
            )}
          </TabBar>
        </div>
        <div className="tab-content flex-row">
          {this.state.selectedTabId === 'vulnerabilities' && (
            <div className="flex-grow">
              <VulnerabilitiesTable
                key={this.props.report.DisplayName}
                report={this.props.report}
              />
            </div>
          )}
          {this.state.selectedTabId === 'misconfigurations' && (
            <div className="flex-grow">
              <MisconfigurationsTable
                key={this.props.report.DisplayName}
                report={this.props.report}
              />
            </div>
          )}
          {this.state.selectedTabId === 'secrets' && (
            <div className="flex-grow">
              <SecretsTable
                key={this.props.report.DisplayName}
                report={this.props.report}
              />
            </div>
          )}
          {this.state.selectedTabId === 'licenses' && (
            <div className="flex-grow">
              <LicensesTable
                key={this.props.report.DisplayName}
                report={this.props.report}
              />
            </div>
          )}
          {this.state.selectedTabId === 'assurance' && (
            <div className="flex-grow">
              <AssuranceTable
                key={this.props.assurance?.Report.DisplayName}
                report={this.props.assurance}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
