App = {};

(function(){

  BOX_1_FRONT = 1;
  BOX_2_FRONT = 2;
  BOX_3_FRONT = 3;
  BOX_4_FRONT = 4;

  var BoxesController = function(){
          console.log('new BoxesController created');
          this.$box1 = $('#box1');
          this.$box2 = $('#box2');
          this.$box3 = $('#box3');
          this.$box4 = $('#box4');
  };


  _.extend(BoxesController.prototype,{

    init : function() {
      var that = this,
          $click_area = $('#container'),
          state = BOX_1_FRONT,
          animation_is_active = false;



      this.$box1.bind('webkitAnimationEnd',function(){
        animation_is_active = false;
        console.log('webkit transition complete @ '+new Date().getTime());
      });

      $click_area.on('click',function($event){
        //console.log(['jquery click event object:',$event])
        if (animation_is_active) {
          console.log('no thank you!');
          return;
        }

        animation_is_active = true;

        switch(state) {
          case BOX_1_FRONT:
            that.move_box_2_to_front();
            state = BOX_2_FRONT;
          break;
          case BOX_2_FRONT:
            that.move_box_3_to_front();
            state = BOX_3_FRONT;
          break;
          case BOX_3_FRONT:
            that.move_box_4_to_front();
            state = BOX_4_FRONT;
          break;
          case BOX_4_FRONT:
            that.move_box_1_to_front();
            state = BOX_1_FRONT;
          break;
          default:
            throw new Exception('unrecognized state value: '+state);
          break;
        }

      });
    },

    move_box_1_to_front : function() {
      console.log('moving box 1 to the front spot, box 4 going to the back spot');
      this.$box1.addClass('move-spot-2-to-1 spot-1').removeClass('spot-2 move-spot-3-to-2');
      this.$box2.addClass('move-spot-3-to-2 spot-2').removeClass('spot-3 move-spot-4-to-3');
      this.$box3.addClass('move-spot-4-to-3 spot-3').removeClass('spot-4 move-spot-1-to-4');
      this.$box4.addClass('move-spot-1-to-4 spot-4').removeClass('spot-1 move-spot-2-to-1');

    },
    move_box_2_to_front : function() {
      console.log('moving box 2 to the front spot, box 1 going to the back spot');
      this.$box2.addClass('move-spot-2-to-1 spot-1').removeClass('spot-2 move-spot-3-to-2');
      this.$box3.addClass('move-spot-3-to-2 spot-2').removeClass('spot-3 move-spot-4-to-3');
      this.$box4.addClass('move-spot-4-to-3 spot-3').removeClass('spot-4 move-spot-1-to-4');
      this.$box1.addClass('move-spot-1-to-4 spot-4').removeClass('spot-1 move-spot-2-to-1');

    },
    move_box_3_to_front : function() {
      console.log('moving box 3 to the front spot, box 2 going to the back spot');
      this.$box3.addClass('move-spot-2-to-1 spot-1').removeClass('spot-2 move-spot-3-to-2');
      this.$box4.addClass('move-spot-3-to-2 spot-2').removeClass('spot-3 move-spot-4-to-3');
      this.$box1.addClass('move-spot-4-to-3 spot-3').removeClass('spot-4 move-spot-1-to-4');
      this.$box2.addClass('move-spot-1-to-4 spot-4').removeClass('spot-1 move-spot-2-to-1');
    },
    move_box_4_to_front : function() {
      console.log('moving box 4 to the front spot, box 3 going to the back spot');
      this.$box4.addClass('move-spot-2-to-1 spot-1').removeClass('spot-2 move-spot-3-to-2');
      this.$box1.addClass('move-spot-3-to-2 spot-2').removeClass('spot-3 move-spot-4-to-3');
      this.$box2.addClass('move-spot-4-to-3 spot-3').removeClass('spot-4 move-spot-1-to-4');
      this.$box3.addClass('move-spot-1-to-4 spot-4').removeClass('spot-1 move-spot-2-to-1');
    },


  });


  $(document).ready(function(){
    console.log('app "main" - document ready fired');
    var boxes = new BoxesController();
    boxes.init();
    App.boxes = boxes;
    App.BoxesController = BoxesController;
  });

})();
