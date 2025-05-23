import * as React from 'react';
import { AssuranceReport, getReportTitle, Report } from './trivy';
import { BaseReport } from './BaseReport';
import { ReportStats } from './ReportStats';
import { ReportDownload } from './ReportDownload';

interface ImageReportProps {
  report: Report;
  assurance: AssuranceReport | undefined;
}

export class ImageReport extends React.Component<ImageReportProps> {
  public props: ImageReportProps;

  constructor(props: ImageReportProps) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="flex-grow">
        <div className="flex-row">
          <h2>{getReportTitle(this.props.report)}</h2>
          <ReportDownload report={this.props.report} />
        </div>
        <div className="flex-row">
          <ReportStats report={this.props.report} />
        </div>
        <div className="flex-row">
          <BaseReport
            report={this.props.report}
            assurance={this.props.assurance}
          />
        </div>
      </div>
    );
  }
}
