const vscode = require('vscode');
const exec = require('child_process').exec;

exports.activate = function (context) {
    var channel = vscode.window.createOutputChannel("SiteD");
    const path = vscode.workspace.getConfiguration().get('sited.DDCatDataPath');
    const adb = vscode.workspace.getConfiguration().get('sited.ADBPath');

	let disposable = vscode.commands.registerCommand('sited.install.adb', (textEditor) => {
		channel.appendLine("发送插件文件……");
		exec(`"${adb}" push ${textEditor.fsPath} ${path}/cache/install.sited`);
		channel.appendLine("执行插件安装……");
		exec(`"${adb}" shell am start -n org.noear.ddcat/.controller.HomeNavigationActivity -a android.intent.action.VIEW -d file://${path}/cache/install.sited`);	
	});

	context.subscriptions.push(disposable);
}

exports.deactivate = function () { }