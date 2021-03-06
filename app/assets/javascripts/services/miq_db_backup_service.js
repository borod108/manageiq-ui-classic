ManageIQ.angular.app.service('miqDBBackupService', function() {
  this.knownProtocolsList = ['Anonymous FTP', 'FTP', 'NFS', 'Samba', 'AWS S3'];

  this.logProtocolNotSelected = function(model) {
    return model.log_protocol === '' || model.log_protocol === undefined;
  };

  this.logProtocolSelected = function(model) {
    return model.log_protocol !== '' && model.log_protocol !== undefined;
  };

  this.logProtocolChanged = function(model) {
    this.resetAll(model);
    if (model.log_protocol === 'Network File System' || model.log_protocol === 'NFS') {
      model.uri_prefix = 'nfs';
    } else if (model.log_protocol === 'Samba') {
      model.uri_prefix = 'smb';
    } else if (model.log_protocol === 'Anonymous FTP' || model.log_protocol === 'FTP') {
      model.uri_prefix = 'ftp';
    } else if (model.log_protocol === 'AWS S3') {
      model.uri_prefix = 's3';
    }
  };

  this.credsProtocol = function(model) {
    return (model.log_protocol === 'Samba' || model.log_protocol === 'AWS S3');
  };

  this.s3Backup = function(model) {
    return (model.log_protocol === 'AWS S3');
  };

  this.dbRequired = function(model, value) {
    return this.logProtocolSelected(model) &&
           (this.isModelValueNil(value));
  };

  this.credsRequired = function(model, value) {
    return this.credsProtocol(model) &&
           (this.isModelValueNil(value));
  };

  this.awsRegionNotSelected = function(model) {
    return model.aws_region === '' || model.aws_region === undefined;
  };

  this.awsRegionSelected = function(model) {
    return model.aws_region !== '' && model.aws_region !== undefined;
  };

  this.badAwsRegionRequired = function(model, value) {
    return this.s3Backup(model) &&
           (this.isModelValueNil(value));
  };

  this.awsRegionRequired = function(model, value) {
    return model.log_protocol === 'AWS S3' &&
           (this.isModelValueNil(value));
  };

  this.isModelValueNil = function(value) {
    return value === undefined || value === null || value === '';
  };

  this.resetAll = function(model) {
    model.log_userid = null;
    model.log_password = null;
    model.uri_prefix = null;
    model.depot_name = null;
    model.uri = null;
  };
});
