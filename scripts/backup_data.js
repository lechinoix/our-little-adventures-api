const { S3Client, DeleteObjectCommand, ListObjectsCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { execSync } = require("child_process");

const s3Client = new S3Client();
const Bucket = "lesnicoisenvadrouille-db-backups";
const MAX_NUMBER_DUMP_FILES = 5;

const listDumpScripts = async () => {
  const listParams = new ListObjectsCommand({ Bucket });
  const { Contents } = await s3Client.send(listParams);
  return Contents;
}

const deleteDumpFile = async ({ Key }) => {
  const deleteParams = new DeleteObjectCommand({ Bucket, Key });
  return await s3Client.send(deleteParams);
}

const deleteOldBackups = async () => {
  const dumpFiles = await listDumpScripts();
  await Promise.all(dumpFiles.sort((a, b) => b.Key.localeCompare(a.Key)).slice(MAX_NUMBER_DUMP_FILES).map(deleteDumpFile))
}

const sendNewBackup = async (dumpScriptContent) => {
  const putParams = new PutObjectCommand({
    Bucket,
    Key: `dump-${Date.now()}.sql`,
    Body: dumpScriptContent
  })
  return await s3Client.send(putParams)
};

const getBackupScriptContent = () => execCommand(`pg_dump ${process.env.DATABASE_URL} --clean`)

const execCommand = command => execSync(command, { stdio: 'pipe' }).toString();

const run = async () => {
  await sendNewBackup(getBackupScriptContent())
  await deleteOldBackups();
}

run()
