/*
  * 开场：无数个点
  * 中间：形成图片RoutedHub
  *
  *
  *
  * 所以只需要选定若干个状态即可
  *
  * 需求：
  * 1. 圆点移动
  *     贝塞尔曲线
  *     非线性速度——开头慢，接近终点时慢一点
  * 2. 字体粗体描边
  * 3. 饱和度稍微低一些 亮度提高
  * 4. 圆点变成辉光？？？？（水平侧变得弱一点）
  * 5. 适配页面大小
  * 6. 暗红色以及明度 亮度相近的几个颜色 比例达到70% 然后少点绿色，#C8161D。以这个颜色为中心去选
  *
  *
  *
  *
  * */

  //生成[0,Max]的随机数
  function GetRandom(Max)
  {
    return Math.random()*Max;
  }
  const BallRadius=1.5;
  const AnimationMax=700;
  const LowerLimitOfTransparency=100;

  let canvas=document.querySelector("canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  let context=canvas.getContext("2d");
  let width=canvas.width;
  let height=canvas.height;
  let cx=width/2;
  let cy=height/2;
  class ImageBall
  {
    constructor(dx,dy)                                        //从随机位置到(dx,dy)
    {
      this.dx=dx;
      this.dy=dy;
      this.r=BallRadius;
      this.initialx=GetRandom(width);
      this.initialy=GetRandom(height);
      this.color=getrgb(GetRandom(255),GetRandom(255),GetRandom(255));
    }
    draw(count)
    {
      //计算在第count次时应该在的位置
      //(x1-x0,y1-y0)*count/AnimationMax+(x0,y0)
      let x=(this.dx-this.initialx)*count/AnimationMax+this.initialx;
      let y=(this.dy-this.initialy)*count/AnimationMax+this.initialy;
      context.beginPath();
      context.arc(x,y,this.r,0,2*Math.PI);
      context.fillStyle=this.color;
      context.fill();
    }
  }

  function getrgb(r,g,b)
  {
    if(r>255)r-=255;
    if(g>255)g-=255;
    if(b>255)b-=255;
    return "rgb("+r.toString()+","+g.toString()+","+b.toString()+")";
  }


  var img=new Image();
  img.src="data:image/png;base64,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";
  let ImageBalls=[];
  img.onload=function ()
  {
    imageload(img);
  }

  //加载图片，使其转换成点阵
  function imageload(img)
  {
    context.clearRect(0,0,img.width,img.height);
    context.drawImage(img,0,0);
    let copy=context.getImageData(0,0,img.width,img.height);
    context.clearRect(0,0,img.width,img.height);
    for(let i=0;i<copy.data.length;i+=80)
      if(copy.data[i+3]>LowerLimitOfTransparency)
      {
        let index=i/4;
        let x=index%img.width;
        let y=Math.floor(index/img.width);
        let ball=new ImageBall(x+cx-img.width/2,y+cy-img.height/2);
        ImageBalls.push(ball);
      }
  }


  window.addEventListener("resize", function(){
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
  }, true);
  function animation(count)
  {
    //前多少次放动画
    //后面固定
    context.clearRect(0,0,canvas.width,canvas.height);
    if(count>AnimationMax) count=AnimationMax;
    for(let i=0;i<ImageBalls.length;i++)
    {
      ImageBalls[i].draw(count);
    }


    count++;
    requestAnimationFrame(function () {
      animation(count);
    })

  }

  animation(0);

