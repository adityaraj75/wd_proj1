var cellColor="Blue";
var token=1;
var dimension=10;
var gamearray=[];
var curr_pos=[];
var play=1;

for(var i=0;i<dimension;i++)
  curr_pos.push(dimension-1);

for(var i=0;i<dimension;i++)
  gamearray.push([]);

for(var i=0;i<dimension;i++)
  for(var j=0;j<dimension;j++)
    gamearray[i].push(0);

function checkvertical(row,col)
{
  if(row>=3)
  {
    var foo=0;
    for(var i=0;i<4;i++)
    if(gamearray[row-i][col])
      foo+=gamearray[row-i][col];
    else{
        foo=0;
        break;
      }
    if(foo===4*gamearray[row][col])
        return true;
  }
  if(row<=(dimension-4))
  {
    var foo=0;
    for(var i=0;i<4;i++)
    if(gamearray[row+i][col])
      foo+=gamearray[row+i][col];
    else{
      foo=0;
      break;
    }
    if(foo===4*gamearray[row][col])
        return true;
  }
  return false;
}

function checkhorizontal(row,col)
{
  if(col>=3)
  {
    var foo=0;
    for(var i=0;i<4;i++)
    if(gamearray[row][col-i])
      foo+=gamearray[row][col-i];
    else {
      foo=0;
      break;
    }
    if(foo===4*gamearray[row][col])
        return true;
  }
  if(col<=(dimension-4))
  {
    var foo=0;
    for(var i=0;i<4;i++)
    if(gamearray[row][col+i])
      foo+=gamearray[row][col+i];
    else {
      foo=0;
      break;
    }
    if(foo===4*gamearray[row][col])
        return true;
  }
  return false;
}

function checkdiagonal(row,col)
{
  var foo1=0,foo2=0,foo3=0,foo4=0;
  for(var i=0;i<4;i++)
  {
    if(row-i<dimension && col-i<dimension)
    {
      if(gamearray[row-i][col-i])
        foo1+=gamearray[row-i][col-i];
      else
      {
        foo1=0;
        break;
      }
    }
    else {
      foo1=0;
      break;
    }
  }

  for(var i=0;i<4;i++)
  {
    if(row+i<dimension && col-i<dimension)
    {
      if(gamearray[row+i][col-i])
        foo2+=gamearray[row+i][col-i];
      else
      {
        foo2=0;
        break;
      }
    }
    else
    {
      foo2=0;
      break;
    }
  }

  for(var i=0;i<4;i++)
  {
    if(row+i<dimension && col+i<dimension)
    {
      if(gamearray[row+i][col+i])
        foo3+=gamearray[row+i][col+i];
      else
      {
        foo3=0;
        break;
      }
    }
    else {
      foo3=0;
      break;
    }
  }

  for(var i=0;i<4;i++)
  {
    if(row-i<dimension && col+i<dimension)
    {
      if(gamearray[row-i][col+i])
        foo4+=gamearray[row-i][col+i];
      else
      {
        foo4=0;
        break;
      }
    }
    else
    {
      foo4=0;
      break;
    }
  }

  if(foo1==4*gamearray[row][col] || foo2==4*gamearray[row][col] || foo3==4*gamearray[row][col] || foo4==4*gamearray[row][col])
      return true;
  return false;
}


function check()
{
  var flag=0;
  for(var i=0;i<dimension;i++)
  {
    if(flag)
      break;
    for(var j=0;j<dimension;j++)
    {
      if(gamearray[i][j]!== 0)
      {
        if(checkvertical(i,j) || checkhorizontal(i,j) || checkdiagonal(i,j))
        {
          flag=1;
          break;
        }
      }
    }
  }
  if(flag)
  {
    play=0;
    $('.decision').css("visibility","visible");
    $(".winner").html("<em>"+cellColor+" wins !!!</em>");
  }
}

$('body').on('click','td',function()
{
  if(play)
  {
    var col=$(this).parent().children().index($(this));
    var row=$(this).parent().parent().children().index($(this).parent());
    var curr_row=$(".row_rest").eq(curr_pos[col]);
    var elements=$(curr_row).children();
    var pos=elements[col];
    $(pos).css("background-color",cellColor);
    gamearray[curr_pos[col]][col]=token;
    if(token==1)
      token=2;
    else {
      token=1;
    }
    check();
    if(cellColor==="Blue")
    cellColor="Red";
    else
    cellColor="Blue";
    curr_pos[col]--;
  }
});

$('body').on('mouseenter','td',function()
{
  var col=$(this).parent().children().index($(this));
  $(".first_circle").eq(col).css("visibility","visible");
  $(".first_circle").eq(col).css("background-color",cellColor);
});


$('body').on('mouseleave','td',function()
{
  var col=$(this).parent().children().index($(this));
  $(".first_circle").eq(col).css("visibility","hidden");
  // $(".first_circle").eq(col).css("background-color","cellColor");
});

$(function(){

  $('#Begin').click(function()
  {
    var x=10;
    var row="<tr class=\"row_rest\">";
    for(var i=0;i<x;i++)
      row=row+"<td class=\"circle\"></td>";
    row+="</tr>";

    var y="<tr class=\"first_row\">";
    for(var i=0;i<10;i++)
      y=y+"<td class=\"circle first_circle\"></td>";
    y+="</tr>";
    $("#gametable").append(y);

    for(var i=0;i<x;i++)
    {
      $("#gametable").append(row);
    }
  });

  $('#Restart').click(function(){
    location.reload();
    $('#Begin').trigger('click');
  });

});
