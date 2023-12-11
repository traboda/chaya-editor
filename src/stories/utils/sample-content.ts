export const SAMPLE_EDITOR_CONTENT = `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus convallis, mi volutpat molestie ullamcorper, dolor lorem sollicitudin nibh, vitae sagittis quam massa porttitor lacus. Praesent commodo auctor convallis. Morbi magna lectus, tristique sed libero sit amet, pretium faucibus nibh. Vivamus nec facilisis sapien. Fusce aliquam pulvinar pharetra. Integer ullamcorper, sapien vel maximus lacinia, dui nisl ultricies mi, ut ultrices enim felis a lectus. Nam blandit porta orci vel suscipit. Maecenas nisi felis, egestas sed dapibus pellentesque, tincidunt at dolor.</p><p></p>

<h1>Text Formating</h1><p></p><p>A text can be <strong>Bold</strong>, <em>Italic,</em> <u>Underlined, </u>or sometimes <s>striked</s>. Our editor is fancy<sup>100</sup> and cool<sub>2</sub>. </p><p></p><p>Here is a quote from a legend -</p><p></p><blockquote><p>React is the best web framework in the world. </p></blockquote><p></p><p>The following is a code-block -</p><p></p><p><code>&lt;ChayaEditor variables={{ highlightClassName: 'bg-yellow-200/50 text-blue-600 p-1 rounded', items: items, }} /&gt;</code></p><p></p><h1>Lists</h1><p></p><p>Here is a list of iteams</p><ol><li><p>Number One</p></li><li><p>Number Two</p><ol><li><p>Two One</p></li><li><p>Two Two</p></li></ol></li><li><p>Number Three</p></li></ol><p></p><p>They may come in bullets as well -</p><ul><li><p>Point</p></li><li><p>Yet Another Point </p><p></p><ul><li><p>Subpoint</p></li><li><p>Yet Another Sub Point</p></li></ul></li><li><p>Additional Point</p></li></ul><p></p><p>You can also put Tasks -</p><ul class="task-list" data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Task One</p></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Task Two</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Task Three</p><p></p></div></li></ul><p></p>

<h1>Table</h1><p></p>

<table><thead><tr><th>Column 1</th><th>Column 2</th></tr></thead><tbody><tr><td>Row 1, Column 1</td><td>Row 1, Column 2</td></tr><tr><td>Row 2, Column 1</td><td>Row 2, Column 2</td></tr></tbody></table><p></p>

<h1>Heading 1</h1><p></p><p style="text-align: justify">Duis in efficitur erat. Donec efficitur, ante sed dictum aliquam, turpis libero faucibus turpis, nec viverra nibh purus et orci. Nulla ultricies mattis mauris, et tincidunt mauris. Nulla rutrum fermentum risus, non malesuada ex tincidunt at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac massa sit amet nibh lacinia consequat. Duis eget maximus turpis. Suspendisse tristique pellentesque pharetra. Fusce suscipit velit sit amet turpis fermentum, vel sodales enim dictum. Nam ut lacinia sapien. Mauris euismod, sem vitae consequat imperdiet, felis ligula pulvinar libero, et feugiat sapien metus ut dui. Donec quis metus pellentesque nibh commodo tristique. Aliquam aliquam nisi a nibh malesuada sodales.</p><p style="text-align: justify"></p><h2>Heading 2</h2><p style="text-align: justify"></p><p style="text-align: justify">Nullam consectetur tristique urna, vel vehicula erat. Etiam id sodales diam. Maecenas sed turpis enim. Sed iaculis sollicitudin leo, at auctor risus facilisis facilisis. Curabitur vitae ligula vitae magna consectetur mollis eget sit amet nibh. Cras hendrerit gravida semper. Curabitur ultrices blandit quam, malesuada viverra nisl placerat sed. Nulla fringilla sodales orci, vitae gravida purus ultrices eu. Integer iaculis libero nec metus rhoncus, non euismod velit fringilla. Etiam feugiat orci nec orci facilisis, non tempus magna mattis. Sed porta laoreet velit, vel interdum eros venenatis sit amet. Proin a varius urna, in laoreet ipsum. Vivamus sagittis ipsum eu tortor viverra iaculis. Ut hendrerit justo ut accumsan dapibus. Nulla porttitor lorem ut augue accumsan efficitur. Pellentesque et efficitur dolor.</p><p style="text-align: justify">Nulla posuere lobortis bibendum. In a arcu ultricies, vehicula turpis ut, fringilla neque. Vestibulum egestas ac massa nec fringilla. Pellentesque a elit a nisi porttitor accumsan. Nullam tempus est et tempor molestie. Nullam ultricies quam eget urna tincidunt, eget laoreet orci dictum. Donec nec eleifend est, quis viverra nisi. Nullam sed odio auctor, egestas tellus ac, feugiat nulla. Ut eu fringilla turpis. Quisque vel diam massa. Vivamus vulputate mauris at massa hendrerit pulvinar. Aliquam quis est diam. Etiam at porttitor ante, ut mollis orci.</p><p style="text-align: justify"></p><h3>Heading 3</h3><p></p><p>Integer lacinia felis vitae faucibus feugiat. Proin libero mi, ullamcorper et gravida at, vehicula a tellus. Quisque laoreet nunc sit amet tincidunt tempus. Suspendisse volutpat sem id velit commodo, at mattis nunc interdum. Sed volutpat in nulla non tempor. Proin semper dolor eget elementum luctus. Proin erat dui, scelerisque sed dui eget, eleifend pharetra sem. Sed tempor nunc quis sapien ullamcorper ornare. Morbi semper nunc posuere nunc convallis, vel hendrerit ex imperdiet. Aenean odio turpis, aliquet ac nisl in, scelerisque elementum eros. Sed in ultrices ligula, eget pulvinar lacus. Donec nec ullamcorper quam, eu auctor lacus. Nam eu rhoncus sapien.</p><p></p><p></p><p style="text-align: justify"></p>
`;